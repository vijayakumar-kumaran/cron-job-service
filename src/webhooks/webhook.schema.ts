import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import mongoose from 'mongoose';
import { CronJob } from '../cron_jobs/cron_job.schema';

export type WebhookDocument = HydratedDocument<Webhook>;

@Schema()
export class Webhook {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'CronJob', required: false })
  cronJobId?: string; // Optional: Associate webhook with a cron job if needed

  @Prop({ type: Object, required: true }) // Store full JSON payload
  data: Record<string, any>;

  @Prop({ default: Date.now }) // Auto-generate timestamp
  receivedAt: Date;
}

export const WebhookSchema = SchemaFactory.createForClass(Webhook);
