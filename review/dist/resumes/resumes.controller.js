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
exports.ResumesController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const firebase_auth_guard_1 = require("../auth/firebase-auth.guard");
const resumes_service_1 = require("./resumes.service");
const ai_service_1 = require("../ai/ai.service");
let ResumesController = class ResumesController {
    constructor(resumeService, aiService) {
        this.resumeService = resumeService;
        this.aiService = aiService;
    }
    async uploadResume(file, req) {
        if (!file) {
            throw new common_1.BadRequestException('No file uploaded');
        }
        try {
            const text = await this.aiService.extractTextFromPdf(file.buffer);
            const review = await this.aiService.reviewResume(text);
            const result = await this.resumeService.handleUpload(file, req.user.uid, review);
            return result;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getAllResumes(req) {
        try {
            const resumes = await this.resumeService.getAllResumes(req.user.id);
            console.log(resumes);
            return resumes;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getReviewResult(id) {
        try {
            const review = await this.resumeService.getReviewResult(id);
            return { review };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    getProfile(req) {
        return `Hello ${req.user.email}`;
    }
};
exports.ResumesController = ResumesController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard),
    (0, swagger_1.ApiBearerAuth)('firebase-token'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ResumesController.prototype, "uploadResume", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard),
    (0, swagger_1.ApiBearerAuth)('firebase-token'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ResumesController.prototype, "getAllResumes", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard),
    (0, swagger_1.ApiBearerAuth)('firebase-token'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ResumesController.prototype, "getReviewResult", null);
__decorate([
    (0, common_1.Get)('profile'),
    (0, common_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard),
    (0, swagger_1.ApiBearerAuth)('firebase-token'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], ResumesController.prototype, "getProfile", null);
exports.ResumesController = ResumesController = __decorate([
    (0, swagger_1.ApiTags)('resumes'),
    (0, common_1.Controller)('resumes'),
    __metadata("design:paramtypes", [resumes_service_1.ResumesService,
        ai_service_1.AiService])
], ResumesController);
//# sourceMappingURL=resumes.controller.js.map