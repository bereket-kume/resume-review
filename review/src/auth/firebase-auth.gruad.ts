import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import admin from '../firebase/firebase-admin';
  
  @Injectable()
  export class FirebaseAuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const req = context.switchToHttp().getRequest();
      const token = req.headers.authorization?.split('Bearer ')[1];
      console.log(token);
      if (!token) {
        throw new UnauthorizedException('No token provided');
      }
  
      try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        return true;
      } catch (err) {
        throw new UnauthorizedException('Invalid token');
      }
    }
  }
  