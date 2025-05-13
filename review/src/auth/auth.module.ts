import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as admin from 'firebase-admin';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'FIREBASE_ADMIN',
      useFactory: () => {
        if (!admin.apps.length) {
          admin.initializeApp({
            credential: admin.credential.cert({
              projectId: process.env.FIREBASE_PROJECT_ID,
              clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
              privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            }),
          });
        }
        return admin;
      },
    },
  ],
  exports: ['FIREBASE_ADMIN'],
})
export class AuthModule {}
