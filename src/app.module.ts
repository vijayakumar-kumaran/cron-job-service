import { Module, Logger, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { CronJob, CronJobSchema } from './cron_jobs/cron_job.schema';
import { CronJobHistory, CronJobHistorySchema } from './cron_jobs/cron_job_history.schema';
import { CronJobsService } from './cron_jobs/cron_jobs.service';
import { CronJobsController } from './cron_jobs/cron_jobs.controller';
import { Webhook, WebhookSchema } from './webhooks/webhook.schema';
import { WebhookService } from './webhooks/webhook.service';
import { WebhookController } from './webhooks/webhook.controller';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import * as mongoose from 'mongoose';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGO_URI: Joi.string().required(),
        THROTTLE_TTL: Joi.number().default(60000),
        THROTTLE_LIMIT: Joi.number().default(10),
      }),
    }),
    MongooseModule.forRoot(process.env.MONGO_URI as string, {
      serverSelectionTimeoutMS: 5000,
      retryAttempts: 1, // Only attempt to connect once
      retryDelay: 0
    }),
    MongooseModule.forFeature([{ name: CronJob.name, schema: CronJobSchema }]),
    MongooseModule.forFeature([{ name: CronJobHistory.name, schema: CronJobHistorySchema }]),
    MongooseModule.forFeature([{ name: Webhook.name, schema: WebhookSchema }]),
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        ttl: parseInt(process.env.THROTTLE_TTL || '60000', 10),
        limit: parseInt(process.env.THROTTLE_LIMIT || '10', 10),
      },
    ]),
  ],
  controllers: [CronJobsController, WebhookController],
  providers: [
    CronJobsService,
    WebhookService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements OnModuleInit {
  private readonly logger = new Logger(AppModule.name);

  async onModuleInit() {
    this.handleMongoDBErrors();
  }

  private handleMongoDBErrors() {
    mongoose.connection.on('error', (err) => {
      this.logger.error(`❌ MongoDB Connection Error: ${err.message}`);
      process.exit(1); // 🚨 Exit application on DB failure
    });

    mongoose.connection.on('disconnected', () => {
      this.logger.warn('⚠️ MongoDB Disconnected. Retrying connection...');
    });

    mongoose.connection.on('connected', () => {
      this.logger.log('✅ Successfully connected to MongoDB');
    });
  }
}