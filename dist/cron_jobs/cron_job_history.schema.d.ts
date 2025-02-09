import { HydratedDocument } from 'mongoose';
import mongoose from 'mongoose';
export type CronJobHistoryDocument = HydratedDocument<CronJobHistory>;
export declare class CronJobHistory {
    cronJobId: string;
    executedAt: Date;
    status: string;
    response: string;
}
export declare const CronJobHistorySchema: mongoose.Schema<CronJobHistory, mongoose.Model<CronJobHistory, any, any, any, mongoose.Document<unknown, any, CronJobHistory> & CronJobHistory & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, CronJobHistory, mongoose.Document<unknown, {}, mongoose.FlatRecord<CronJobHistory>> & mongoose.FlatRecord<CronJobHistory> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
