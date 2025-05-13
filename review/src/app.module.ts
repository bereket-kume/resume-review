import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResumesModule } from './resumes/resumes.module';
import { AiService } from './ai/ai.service';
import { NotificationService } from './notification/notification.service';
import { AuthModule } from './auth/auth.module';
import { SupabaseModule } from './supabase/supabase.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SupabaseModule,
    ResumesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, AiService, NotificationService],
})
export class AppModule {}
