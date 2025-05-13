import { SupabaseService } from '../supabase/supabase.service';
export declare class ResumesService {
    private readonly supabaseService;
    constructor(supabaseService: SupabaseService);
    handleUpload(file: Express.Multer.File, userId: string, review: string): Promise<{
        message: string;
        resumeId: any;
        filePath: any;
        review: any;
    }>;
    getAllResumes(userId: string): Promise<any[]>;
    getReviewResult(resumeId: string): Promise<any>;
}
