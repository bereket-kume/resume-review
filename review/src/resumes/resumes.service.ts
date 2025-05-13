import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class ResumesService {

    constructor( private readonly supabaseService: SupabaseService) {}

    async handleUpload(file: Express.Multer.File, userId: string, review: string) {
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

    async getAllResumes(userId: string) {
        const supabase = this.supabaseService.getClient();
        const { data, error } = await supabase
            .from('resumes')
            .select('*')
            .eq('user_id', userId)

        if (error) {
            throw new Error(`Failed to fetch resumes: ${error.message}`);
        }

        return data;
    }


    async getReviewResult(resumeId: string) {
        const supabase = this.supabaseService.getClient();
        const { data, error } = await supabase
            .from('resumes')
            .select('review')
            .eq('id', resumeId)
            .single();

        if (error) throw new Error(error.message);
        return data.review;
    }
}
