import { HydratedDocument } from 'mongoose';
import mongoose from 'mongoose';
export type WebhookDocument = HydratedDocument<Webhook>;
export declare class Webhook {
    cronJobId?: string;
    data: Record<string, any>;
    receivedAt: Date;
}
export declare const WebhookSchema: mongoose.Schema<Webhook, mongoose.Model<Webhook, any, any, any, mongoose.Document<unknown, any, Webhook> & Webhook & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Webhook, mongoose.Document<unknown, {}, mongoose.FlatRecord<Webhook>> & mongoose.FlatRecord<Webhook> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
