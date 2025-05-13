import { 
    Controller,
    Get,
    Post,
    UseGuards,
    Req,
    UploadedFile,
    UseInterceptors,
    Param,
    BadRequestException
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { ResumesService } from './resumes.service';
import { AiService } from '../ai/ai.service';

@ApiTags('resumes')
@Controller('resumes')
export class ResumesController {
    constructor(
        private readonly resumeService: ResumesService,
        private readonly aiService: AiService
    ) {}

    @Post('upload')
    @UseGuards(FirebaseAuthGuard)
    @ApiBearerAuth('firebase-token')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @UseInterceptors(FileInterceptor('file'))
    async uploadResume(
        @UploadedFile() file: Express.Multer.File,
        @Req() req
    ) {
        if (!file) {
            throw new BadRequestException('No file uploaded');
        }

        try {
            // Extract text from PDF
            const text = await this.aiService.extractTextFromPdf(file.buffer);
            
            // Get AI review of the resume
            const review = await this.aiService.reviewResume(text);
            
            // Upload file and save review
            const result = await this.resumeService.handleUpload(
                file,
                req.user.uid,
                review
            );

            return result;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

   

    @Get()
    @UseGuards(FirebaseAuthGuard)
    @ApiBearerAuth('firebase-token')
    async getAllResumes(@Req() req) {
        try {
            const resumes = await this.resumeService.getAllResumes(req.user.id);
            console.log(resumes);
            return resumes;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Get(':id')
    @UseGuards(FirebaseAuthGuard)
    @ApiBearerAuth('firebase-token')
    async getReviewResult(@Param('id') id: string) {
        try {
            const review = await this.resumeService.getReviewResult(id);
            return { review };
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Get('profile')
    @UseGuards(FirebaseAuthGuard)
    @ApiBearerAuth('firebase-token')
    getProfile(@Req() req): string {
        return `Hello ${req.user.email}`;
    }
}
