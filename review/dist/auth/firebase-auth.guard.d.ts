import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class FirebaseAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractToken;
}
