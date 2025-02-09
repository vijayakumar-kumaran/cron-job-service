"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var CronJobsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronJobsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const schedule_1 = require("@nestjs/schedule");
const axios_1 = require("axios");
const cron_1 = require("cron");
const cron_job_schema_1 = require("./cron_job.schema");
const cron_job_history_schema_1 = require("./cron_job_history.schema");
const schedule_2 = require("@nestjs/schedule");
let CronJobsService = CronJobsService_1 = class CronJobsService {
    constructor(cronJobModel, cronJobHistoryModel, schedulerRegistry) {
        this.cronJobModel = cronJobModel;
        this.cronJobHistoryModel = cronJobHistoryModel;
        this.schedulerRegistry = schedulerRegistry;
        this.logger = new common_1.Logger(CronJobsService_1.name);
    }
    async create(cronJobData) {
        this.logger.log(`📝 Creating new cron job: ${cronJobData.name}`);
        const cronJob = await this.cronJobModel.create(cronJobData);
        this.scheduleCronJob(cronJob);
        return cronJob;
    }
    async findAll() {
        return this.cronJobModel.find().exec();
    }
    async findOne(id) {
        return this.cronJobModel.findById(id).exec();
    }
    async update(id, updateData) {
        this.logger.log(`🔄 Updating cron job [${id}]`);
        const updatedJob = await this.cronJobModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
        if (updatedJob) {
            this.scheduleCronJob(updatedJob);
        }
        return updatedJob;
    }
    async delete(id) {
        this.logger.warn(`🗑️ Deleting cron job [${id}]`);
        return this.cronJobModel.findByIdAndDelete(id).exec();
    }
    async getExecutionHistory(jobId) {
        return this.cronJobHistoryModel.find({ cronJobId: jobId }).sort({ executedAt: -1 }).exec();
    }
    async testCronJobs() {
        this.logger.log('🔄 Checking and executing scheduled cron jobs...');
        const cronJobs = await this.findAll();
        for (const job of cronJobs) {
            const jobId = job._id.toString();
            this.logger.log(`🚀 Executing cron job: [${jobId}] ${job.name} - ${job.schedule}`);
            let status = 'success';
            let responseData = '';
            const executionTime = new Date();
            try {
                const response = await axios_1.default.get(job.triggerUrl);
                responseData = JSON.stringify(response.data);
                this.logger.log(`✅ Job [${jobId}] executed successfully. Response: ${responseData}`);
            }
            catch (error) {
                status = 'failed';
                responseData = error.message;
                this.logger.error(`❌ Error executing job [${jobId}] ${job.name}: ${error.message}`, error.stack);
            }
            await this.cronJobHistoryModel.create({
                cronJobId: jobId,
                executedAt: executionTime,
                status,
                response: responseData,
            });
            this.logger.debug(`📌 Execution history saved for job [${jobId}] at ${executionTime.toISOString()}`);
        }
    }
    scheduleCronJob(cronJob) {
        const { triggerUrl, schedule } = cronJob;
        const jobId = cronJob._id?.toString();
        if (!jobId) {
            this.logger.warn(`⚠️ Job ID is missing for ${cronJob.name}`);
            return;
        }
        let cronExpression;
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
        const job = new cron_1.CronJob(cronExpression, async () => {
            this.logger.log(`⏳ Running scheduled job [${jobId}] - ${triggerUrl}`);
            try {
                const response = await axios_1.default.get(triggerUrl);
                this.logger.log(`✅ Scheduled job [${jobId}] completed. Response: ${JSON.stringify(response.data)}`);
            }
            catch (error) {
                this.logger.error(`❌ Error running scheduled job [${jobId}]: ${error.message}`, error.stack);
            }
        });
        this.schedulerRegistry.addCronJob(jobId, job);
        job.start();
        this.logger.log(`📅 Scheduled job [${jobId}] with schedule ${schedule}`);
    }
};
exports.CronJobsService = CronJobsService;
__decorate([
    (0, schedule_2.Cron)('* * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CronJobsService.prototype, "testCronJobs", null);
exports.CronJobsService = CronJobsService = CronJobsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(cron_job_schema_1.CronJob.name)),
    __param(1, (0, mongoose_1.InjectModel)(cron_job_history_schema_1.CronJobHistory.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        schedule_1.SchedulerRegistry])
], CronJobsService);
//# sourceMappingURL=cron_jobs.service.js.map