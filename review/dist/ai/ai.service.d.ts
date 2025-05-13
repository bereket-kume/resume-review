import { SupabaseService } from '../supabase/supabase.service';
export declare class AiService {
    private readonly supabaseService;
    constructor(supabaseService: SupabaseService);
    private readonly geminiUrl;
    private readonly geminiApiKey;
    extractTextFromPdf(buffer: Buffer): Promise<any>;
    reviewResume(text: string): Promise<any>;
}
