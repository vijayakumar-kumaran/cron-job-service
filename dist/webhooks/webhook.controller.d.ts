import { WebhookService } from './webhook.service';
export declare class WebhookController {
    private readonly webhookService;
    constructor(webhookService: WebhookService);
    receiveWebhook(payload: any, cronJobId?: string): Promise<import("./webhook.schema").Webhook>;
    getAllWebhooks(): Promise<import("./webhook.schema").Webhook[]>;
}
