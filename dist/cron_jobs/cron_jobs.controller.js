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
exports.CronJobsController = void 0;
const common_1 = require("@nestjs/common");
const cron_jobs_service_1 = require("./cron_jobs.service");
let CronJobsController = class CronJobsController {
    constructor(cronJobsService) {
        this.cronJobsService = cronJobsService;
    }
    create(cronJobData) {
        return this.cronJobsService.create(cronJobData);
    }
    findAll() {
        return this.cronJobsService.findAll();
    }
    findOne(id) {
        return this.cronJobsService.findOne(id);
    }
    update(id, updateData) {
        return this.cronJobsService.update(id, updateData);
    }
    delete(id) {
        return this.cronJobsService.delete(id);
    }
    async getExecutionHistory(id) {
        return this.cronJobsService.getExecutionHistory(id);
    }
};
exports.CronJobsController = CronJobsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CronJobsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CronJobsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CronJobsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CronJobsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CronJobsController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)(':id/history'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CronJobsController.prototype, "getExecutionHistory", null);
exports.CronJobsController = CronJobsController = __decorate([
    (0, common_1.Controller)('cron-jobs'),
    __metadata("design:paramtypes", [cron_jobs_service_1.CronJobsService])
], CronJobsController);
//# sourceMappingURL=cron_jobs.controller.js.map