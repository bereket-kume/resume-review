import { ResumesService } from './resumes.service';
import { AiService } from '../ai/ai.service';
export declare class ResumesController {
    private readonly resumeService;
    private readonly aiService;
    constructor(resumeService: ResumesService, aiService: AiService);
    uploadResume(file: Express.Multer.File, req: any): Promise<{
        message: string;
        resumeId: any;
        filePath: any;
        review: any;
    }>;
    getAllResumes(req: any): Promise<any[]>;
    getReviewResult(id: string): Promise<{
        review: any;
    }>;
    getProfile(req: any): string;
}
