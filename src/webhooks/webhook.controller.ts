import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { Throttle, SkipThrottle } from '@nestjs/throttler';

@Controller('webhooks')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post()
  @Throttle({ default: { limit: 3, ttl: 30000 } })
  async receiveWebhook(@Body() payload: any, @Query('cronJobId') cronJobId?: string) {
    return this.webhookService.saveWebhook(payload, cronJobId);
  }

  @Get()
  @SkipThrottle() 
  @Get('no-limit')
  async getAllWebhooks() {
    return this.webhookService.findAll();
  }
}