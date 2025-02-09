import { Test, TestingModule } from '@nestjs/testing';
import { CronJobsService } from './cron_jobs.service';
import { getModelToken } from '@nestjs/mongoose';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Model } from 'mongoose';

describe('CronJobsService', () => {
  let service: CronJobsService;
  let cronJobModel: Model<any>;
  let cronJobHistoryModel: Model<any>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CronJobsService,
        {
          provide: getModelToken('CronJob'),
          useValue: {
            create: jest.fn().mockImplementation((data) => Promise.resolve({ ...data, _id: 'mockId' })), // ✅ Mock `create()`
            find: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
          },
        },
        {
          provide: getModelToken('CronJobHistory'),
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: SchedulerRegistry,
          useValue: {
            addCronJob: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CronJobsService>(CronJobsService);
    cronJobModel = module.get<Model<any>>(getModelToken('CronJob'));
    cronJobHistoryModel = module.get<Model<any>>(getModelToken('CronJobHistory'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a cron job', async () => {
    const cronJobData = { name: 'Test Job', triggerUrl: 'http://example.com' };
    
    const result = await service.create(cronJobData);

    expect(result).toEqual(expect.objectContaining({ _id: 'mockId', ...cronJobData }));
    expect(cronJobModel.create).toHaveBeenCalledWith(cronJobData);
  });
});
