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
exports.AiService = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../supabase/supabase.service");
const pdfParse = require("pdf-parse");
let AiService = class AiService {
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
        this.geminiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
        this.geminiApiKey = "AIzaSyCPby2bGvDXz6-tod30BG8y056f3WRFmwk";
    }
    async extractTextFromPdf(buffer) {
        try {
            const data = await pdfParse(buffer);
            return data.text;
        }
        catch (error) {
            console.error('Error extracting text from PDF:', error);
            throw error;
        }
    }
    async reviewResume(text) {
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
        }
        catch (error) {
            console.error('Error reviewing resume:', error);
            throw error;
        }
    }
};
exports.AiService = AiService;
exports.AiService = AiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], AiService);
//# sourceMappingURL=ai.service.js.map