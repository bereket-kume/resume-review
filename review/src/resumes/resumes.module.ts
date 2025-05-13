import { Module } from '@nestjs/common';
import { ResumesController } from './resumes.controller';
import { ResumesService } from './resumes.service';
import { SupabaseModule } from '../supabase/supabase.module';
import { AiService } from '../ai/ai.service';

@Module({
  imports: [SupabaseModule],
  controllers: [ResumesController],
  providers: [ResumesService, AiService]
})
export class ResumesModule {}
