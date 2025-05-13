import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import * as pdfParse from 'pdf-parse';

@Injectable()
export class AiService {
    constructor(private readonly supabaseService: SupabaseService) {}
    private readonly geminiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"
    private readonly geminiApiKey = "AIzaSyCPby2bGvDXz6-tod30BG8y056f3WRFmwk"

    async extractTextFromPdf(buffer: Buffer) {
        try {
            const data = await pdfParse(buffer);
            return data.text;
        } catch (error) {
            console.error('Error extracting text from PDF:', error);
            throw error;
        }
    }

    async reviewResume(text: string) {
        
        try {
            const response = await fetch(`${this.geminiUrl}?key=${this.geminiApiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `Please review this resume and provide feedback in the following format:
                            Strengths: [list key strengths]
                            Areas for Improvement: [list areas that need improvement]
                            Suggestions: [list specific suggestions]
                            Overall Score: [score out of 10]
                            
                            Resume Text: ${text}`
                        }]
                    }]
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Gemini API error:', errorText);
                throw new Error('Failed to get review from Gemini');
            }

            const data = await response.json();
            return data.candidates[0].content.parts[0].text;
        } catch (error) {
            console.error('Error reviewing resume:', error);
            throw error;
        }
    }
}
