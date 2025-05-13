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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResumesService = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../supabase/supabase.service");
let ResumesService = class ResumesService {
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
    }
    async handleUpload(file, userId, review) {
        const supabase = this.supabaseService.getClient();
        const fileName = `${userId}/${Date.now()}-${file.originalname}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('resumes')
            .upload(fileName, file.buffer, {
            contentType: file.mimetype,
        });
        if (uploadError) {
            throw new Error(`Storage upload failed: ${uploadError.message}`);
        }
        const { data: dbData, error: dbError } = await supabase
            .from('resumes')
            .insert([
            {
                user_id: userId,
                file_path: fileName,
                original_name: file.originalname,
                review: review
            }
        ])
            .select()
            .single();
        if (dbError) {
            throw new Error(`Database insert failed: ${dbError.message}`);
        }
        return {
            message: 'Resume uploaded and reviewed successfully',
            resumeId: dbData.id,
            filePath: dbData.file_path,
            review: dbData.review
        };
    }
    async getAllResumes(userId) {
        const supabase = this.supabaseService.getClient();
        const { data, error } = await supabase
            .from('resumes')
            .select('*')
            .eq('user_id', userId);
        if (error) {
            throw new Error(`Failed to fetch resumes: ${error.message}`);
        }
        return data;
    }
    async getReviewResult(resumeId) {
        const supabase = this.supabaseService.getClient();
        const { data, error } = await supabase
            .from('resumes')
            .select('review')
            .eq('id', resumeId)
            .single();
        if (error)
            throw new Error(error.message);
        return data.review;
    }
};
exports.ResumesService = ResumesService;
exports.ResumesService = ResumesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], ResumesService);
//# sourceMappingURL=resumes.service.js.map