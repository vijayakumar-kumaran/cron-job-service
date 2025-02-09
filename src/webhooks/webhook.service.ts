import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Webhook, WebhookDocument } from './webhook.schema';

@Injectable()
export class WebhookService {
  constructor(@InjectModel(Webhook.name) private webhookModel: Model<WebhookDocument>) {}

  async saveWebhook(data: any, cronJobId?: string): Promise<Webhook> {
    return this.webhookModel.create({
      cronJobId,
      data,
      receivedAt: new Date(),
    });
  }

  async findAll(): Promise<Webhook[]> {
    return this.webhookModel.find().sort({ receivedAt: -1 }).exec();
  }
}
