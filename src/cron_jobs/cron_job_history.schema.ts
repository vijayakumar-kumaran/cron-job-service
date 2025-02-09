import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import mongoose from 'mongoose';

export type CronJobHistoryDocument = HydratedDocument<CronJobHistory>;

@Schema()
export class CronJobHistory {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'CronJob', required: true })
  cronJobId: string;

  @Prop({ required: true })
  executedAt: Date;

  @Prop()
  status: string;

  @Prop()
  response: string;
}

export const CronJobHistorySchema = SchemaFactory.createForClass(CronJobHistory);
