"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AppModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const schedule_1 = require("@nestjs/schedule");
const cron_job_schema_1 = require("./cron_jobs/cron_job.schema");
const cron_job_history_schema_1 = require("./cron_jobs/cron_job_history.schema");
const cron_jobs_service_1 = require("./cron_jobs/cron_jobs.service");
const cron_jobs_controller_1 = require("./cron_jobs/cron_jobs.controller");
const webhook_schema_1 = require("./webhooks/webhook.schema");
const webhook_service_1 = require("./webhooks/webhook.service");
const webhook_controller_1 = require("./webhooks/webhook.controller");
const throttler_1 = require("@nestjs/throttler");
const core_1 = require("@nestjs/core");
const mongoose = require("mongoose");
const Joi = require("joi");
let AppModule = AppModule_1 = class AppModule {
    constructor() {
        this.logger = new common_1.Logger(AppModule_1.name);
    }
    async onModuleInit() {
        this.handleMongoDBErrors();
    }
    handleMongoDBErrors() {
        mongoose.connection.on('error', (err) => {
            this.logger.error(`❌ MongoDB Connection Error: ${err.message}`);
            process.exit(1);
        });
        mongoose.connection.on('disconnected', () => {
            this.logger.warn('⚠️ MongoDB Disconnected. Retrying connection...');
        });
        mongoose.connection.on('connected', () => {
            this.logger.log('✅ Successfully connected to MongoDB');
        });
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = AppModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                validationSchema: Joi.object({
                    MONGO_URI: Joi.string().required(),
                    THROTTLE_TTL: Joi.number().default(60000),
                    THROTTLE_LIMIT: Joi.number().default(10),
                }),
            }),
            mongoose_1.MongooseModule.forRoot(process.env.MONGO_URI, {
                serverSelectionTimeoutMS: 5000,
                retryAttempts: 1,
                retryDelay: 0
            }),
            mongoose_1.MongooseModule.forFeature([{ name: cron_job_schema_1.CronJob.name, schema: cron_job_schema_1.CronJobSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: cron_job_history_schema_1.CronJobHistory.name, schema: cron_job_history_schema_1.CronJobHistorySchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: webhook_schema_1.Webhook.name, schema: webhook_schema_1.WebhookSchema }]),
            schedule_1.ScheduleModule.forRoot(),
            throttler_1.ThrottlerModule.forRoot([
                {
                    ttl: parseInt(process.env.THROTTLE_TTL || '60000', 10),
                    limit: parseInt(process.env.THROTTLE_LIMIT || '10', 10),
                },
            ]),
        ],
        controllers: [cron_jobs_controller_1.CronJobsController, webhook_controller_1.WebhookController],
        providers: [
            cron_jobs_service_1.CronJobsService,
            webhook_service_1.WebhookService,
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map