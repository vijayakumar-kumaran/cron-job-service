import { Model } from 'mongoose';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob, CronJobDocument } from './cron_job.schema';
import { CronJobHistory, CronJobHistoryDocument } from './cron_job_history.schema';
export declare class CronJobsService {
    private cronJobModel;
    private cronJobHistoryModel;
    private schedulerRegistry;
    private readonly logger;
    constructor(cronJobModel: Model<CronJobDocument>, cronJobHistoryModel: Model<CronJobHistoryDocument>, schedulerRegistry: SchedulerRegistry);
    create(cronJobData: Partial<CronJob>): Promise<CronJob>;
    findAll(): Promise<CronJob[]>;
    findOne(id: string): Promise<CronJob | null>;
    update(id: string, updateData: Partial<CronJob>): Promise<CronJob | null>;
    delete(id: string): Promise<CronJob | null>;
    getExecutionHistory(jobId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, CronJobHistory> & CronJobHistory & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & import("mongoose").Document<unknown, {}, CronJobHistory> & CronJobHistory & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    testCronJobs(): Promise<void>;
    private scheduleCronJob;
}
