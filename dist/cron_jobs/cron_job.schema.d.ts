import { HydratedDocument } from 'mongoose';
export type CronJobDocument = HydratedDocument<CronJob>;
export declare class CronJob {
    name: string;
    triggerUrl: string;
    apiKey: string;
    schedule: string;
    startDate: Date;
    createdAt: Date;
}
export declare const CronJobSchema: import("mongoose").Schema<CronJob, import("mongoose").Model<CronJob, any, any, any, import("mongoose").Document<unknown, any, CronJob> & CronJob & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CronJob, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<CronJob>> & import("mongoose").FlatRecord<CronJob> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
