import { CronJobsService } from './cron_jobs.service';
import { CronJob } from './cron_job.schema';
import { CronJobHistory } from './cron_job_history.schema';
export declare class CronJobsController {
    private readonly cronJobsService;
    constructor(cronJobsService: CronJobsService);
    create(cronJobData: Partial<CronJob>): Promise<CronJob>;
    findAll(): Promise<CronJob[]>;
    findOne(id: string): Promise<CronJob | null>;
    update(id: string, updateData: Partial<CronJob>): Promise<CronJob | null>;
    delete(id: string): Promise<CronJob | null>;
    getExecutionHistory(id: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, CronJobHistory> & CronJobHistory & {
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
}
