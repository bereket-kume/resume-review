"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const firebase_admin_1 = require("../firebase/firebase-admin");
let FirebaseAuthGuard = class FirebaseAuthGuard {
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const token = req.headers.authorization?.split('Bearer ')[1];
        console.log(token);
        if (!token) {
            throw new common_1.UnauthorizedException('No token provided');
        }
        try {
            const decodedToken = await firebase_admin_1.default.auth().verifyIdToken(token);
            req.user = decodedToken;
            return true;
        }
        catch (err) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
};
exports.FirebaseAuthGuard = FirebaseAuthGuard;
exports.FirebaseAuthGuard = FirebaseAuthGuard = __decorate([
    (0, common_1.Injectable)()
], FirebaseAuthGuard);
//# sourceMappingURL=firebase-auth.gruad.js.map