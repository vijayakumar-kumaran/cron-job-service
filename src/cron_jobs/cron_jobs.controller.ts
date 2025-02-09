import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CronJobsService } from './cron_jobs.service';
import { CronJob } from './cron_job.schema';
import { CronJobHistory } from './cron_job_history.schema';

@Controller('cron-jobs')
export class CronJobsController {
  constructor(private readonly cronJobsService: CronJobsService) {}

  @Post()
  create(@Body() cronJobData: Partial<CronJob>) {
    return this.cronJobsService.create(cronJobData);
  }

  @Get()
  findAll() {
    return this.cronJobsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cronJobsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateData: Partial<CronJob>) {
    return this.cronJobsService.update(id, updateData);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.cronJobsService.delete(id);
  }

  @Get(':id/history')
  async getExecutionHistory(@Param('id') id: string) {
    return this.cronJobsService.getExecutionHistory(id);
  }
  
}
