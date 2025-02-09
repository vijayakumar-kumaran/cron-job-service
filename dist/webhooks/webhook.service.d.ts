import { Model } from 'mongoose';
import { Webhook, WebhookDocument } from './webhook.schema';
export declare class WebhookService {
    private webhookModel;
    constructor(webhookModel: Model<WebhookDocument>);
    saveWebhook(data: any, cronJobId?: string): Promise<Webhook>;
    findAll(): Promise<Webhook[]>;
}
