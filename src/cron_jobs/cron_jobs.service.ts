import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SchedulerRegistry } from '@nestjs/schedule';
import axios from 'axios';
import { CronJob as NodeCronJob } from 'cron';
import { CronJob, CronJobDocument } from './cron_job.schema';
import { CronJobHistory, CronJobHistoryDocument } from './cron_job_history.schema';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class CronJobsService {
  private readonly logger = new Logger(CronJobsService.name);

  constructor(
    @InjectModel(CronJob.name) private cronJobModel: Model<CronJobDocument>,
    @InjectModel(CronJobHistory.name) private cronJobHistoryModel: Model<CronJobHistoryDocument>,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  async create(cronJobData: Partial<CronJob>): Promise<CronJob> {
    this.logger.log(`📝 Creating new cron job: ${cronJobData.name}`);
    const cronJob = await this.cronJobModel.create(cronJobData);
    this.scheduleCronJob(cronJob);
    return cronJob;
  }
  

  async findAll(): Promise<CronJob[]> {
    return this.cronJobModel.find().exec();
  }

  async findOne(id: string): Promise<CronJob | null> {
    return this.cronJobModel.findById(id).exec();
  }

  async update(id: string, updateData: Partial<CronJob>): Promise<CronJob | null> {
    this.logger.log(`🔄 Updating cron job [${id}]`);
    const updatedJob = await this.cronJobModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    if (updatedJob) {
      this.scheduleCronJob(updatedJob);
    }
    return updatedJob;
  }

  async delete(id: string): Promise<CronJob | null> {
    this.logger.warn(`🗑️ Deleting cron job [${id}]`);
    return this.cronJobModel.findByIdAndDelete(id).exec();
  }

  async getExecutionHistory(jobId: string) {
    return this.cronJobHistoryModel.find({ cronJobId: jobId }).sort({ executedAt: -1 }).exec();
  }
  
  // For testing Purpose only kindly remove this method in production
  @Cron('* * * * *') // Runs every minute
  async testCronJobs() {
    this.logger.log('🔄 Checking and executing scheduled cron jobs...');
    const cronJobs = await this.findAll();

    for (const job of cronJobs) {
      const jobId = (job as CronJobDocument)._id.toString();
      this.logger.log(`🚀 Executing cron job: [${jobId}] ${job.name} - ${job.schedule}`);

      let status = 'success';
      let responseData = '';
      const executionTime = new Date();

      try {
        const response = await axios.get(job.triggerUrl);
        responseData = JSON.stringify(response.data);
        this.logger.log(`✅ Job [${jobId}] executed successfully. Response: ${responseData}`);
      } catch (error) {
        status = 'failed';
        responseData = error.message;
        this.logger.error(`❌ Error executing job [${jobId}] ${job.name}: ${error.message}`, error.stack);
      }

      // ✅ Save execution history in MongoDB
      await this.cronJobHistoryModel.create({
        cronJobId: jobId,
        executedAt: executionTime,
        status,
        response: responseData,
      });

      this.logger.debug(`📌 Execution history saved for job [${jobId}] at ${executionTime.toISOString()}`);
    }
  }

  private scheduleCronJob(cronJob: CronJobDocument) {
    const { triggerUrl, schedule } = cronJob;
    const jobId = cronJob._id?.toString();

    if (!jobId) {
      this.logger.warn(`⚠️ Job ID is missing for ${cronJob.name}`);
      return;
    }

    let cronExpression: string;
    switch (schedule) {
      case 'daily':
        cronExpression = '0 0 * * *';
        break;
      case 'weekly':
        cronExpression = '0 0 * * 0';
        break;
      case 'monthly':
        cronExpression = '0 0 1 * *';
        break;
      default:
        this.logger.warn(`⚠️ Invalid schedule type for job [${jobId}]: ${schedule}`);
        return;
    }

    const job = new NodeCronJob(cronExpression, async () => {
      this.logger.log(`⏳ Running scheduled job [${jobId}] - ${triggerUrl}`);
      try {
        const response = await axios.get(triggerUrl);
        this.logger.log(`✅ Scheduled job [${jobId}] completed. Response: ${JSON.stringify(response.data)}`);
      } catch (error) {
        this.logger.error(`❌ Error running scheduled job [${jobId}]: ${error.message}`, error.stack);
      }
    });

    this.schedulerRegistry.addCronJob(jobId, job);
    job.start();
    this.logger.log(`📅 Scheduled job [${jobId}] with schedule ${schedule}`);
  }
}
