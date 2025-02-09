import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CronJobDocument = HydratedDocument<CronJob>;

@Schema()
export class CronJob {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  triggerUrl: string;

  @Prop({ required: true })
  apiKey: string;

  @Prop({ required: true, enum: ['weekly', 'monthly', 'daily'] })
  schedule: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const CronJobSchema = SchemaFactory.createForClass(CronJob);
