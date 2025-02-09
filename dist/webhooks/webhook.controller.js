"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookController = void 0;
const common_1 = require("@nestjs/common");
const webhook_service_1 = require("./webhook.service");
const throttler_1 = require("@nestjs/throttler");
let WebhookController = class WebhookController {
    constructor(webhookService) {
        this.webhookService = webhookService;
    }
    async receiveWebhook(payload, cronJobId) {
        return this.webhookService.saveWebhook(payload, cronJobId);
    }
    async getAllWebhooks() {
        return this.webhookService.findAll();
    }
};
exports.WebhookController = WebhookController;
__decorate([
    (0, common_1.Post)(),
    (0, throttler_1.Throttle)({ default: { limit: 3, ttl: 30000 } }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)('cronJobId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], WebhookController.prototype, "receiveWebhook", null);
__decorate([
    (0, common_1.Get)(),
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.Get)('no-limit'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WebhookController.prototype, "getAllWebhooks", null);
exports.WebhookController = WebhookController = __decorate([
    (0, common_1.Controller)('webhooks'),
    __metadata("design:paramtypes", [webhook_service_1.WebhookService])
], WebhookController);
//# sourceMappingURL=webhook.controller.js.map