import * as admin from 'firebase-admin';

admin.initializeApp({
    credential: admin.credential.cert({
        projectId: 'nest-auth-ebc26',
        clientEmail: 'firebase-adminsdk-gbxbs@nest-auth-ebc26.iam.gserviceaccount.com',
        privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCmEGadjLhs04wd\nX+wGcAiAwM5Z2kcWG+/mUaUtKLUn4Qq6De54Kmd9A5vr0XfzmJkyX5r+Q2K0dElG\n1dUXjYK6Eg1WrdG5T430f14I1xdac3T9rpx5OzVC7MvbHL5b2kbfV/MKy+X6juSH\nX1Fx4IKTjqvBTlRd3DpoGGNdWyUQwZUW52oyBX+75MyAn1JebF7d0RfWD/YNhfeq\niMnjpRkOQJAfch4bjSt9zMJc3h6qRC/W1D6IwUToXYMohZroZHj49/j2o4+xZqsD\nb6BAlq2NhbENA7sMl0g6PgWu8FDqPIKNiOpbozor0qiHPprHxbBo8gbxlELrNJlk\nqtZJ/Z4/AgMBAAECggEABXAif6vVsHf2UW6amCoKXwT/ix19wqpdF/8ryeB1DVPR\nz1PuIVQjC6dP0wk1i9GUc5hlqp2poJUqRgU5CJ/cBw5KuU57pARrr4M4PTTCZq8Y\nHADKzkwsK1TErfvb+xOZIBk3+wqj2BszzGOBdu7caZInB7aAYzWTy52HDwbKSPA+\nh8H0HCacKQqSMfV7c9iAFy21mTu3W3qNgWKeJZfP0TseM3LrHxk1EeIiKSR1D3+Z\ns+kAymYWStA0iCnJynYQLVBjtLQy7VRHVOlWT3pd8jWG4KJbJqcXyRJbKBPKQvtA\n6XmxKvPAXN1Wn49UCQuHefefBPYYTHP3SHhu56ygYQKBgQDonjy3DvynOhiYLtAO\nUMSwDPc9ZhJp8L/NPknmyMoxcMAedx/ScfzZL1qa3v0ebyd2dxCgOUWZx/aDgbRd\ngjBkgnKQROwLHNWr2pN5peAh4e80yqpQta1LlDN7FUNhwUcOTzVXxtyJM19zYQhc\nR6ORIXtnGQY9Dg7/qXumEIDK8QKBgQC2wZXXMDqoHmKl8t7Nq3Lpy1/dMBhorLI4\nbSii9QiEAbj5OxTZNmaXXKgKILkEGzlQvVGu8wL5oNpwaXrKMVMIAyTq+CjiFxfe\nnJs/CkiUe1BE1qV3NUJ4lHMWe9jlmsncfdjKcwBf6lf9+NKpmdTlP0YoA4YQ58Ib\nrIGcEoYcLwKBgQCVrOOSQlFtZKNYoJ5855l3UhBv8FKe2ir/7DlvBvma0Fq9/5Z5\nOaEhOigJiLvDrm/s+PW4ssFHDvReb8HXfSKYOZtvmvlquRX/azgDSSkrhA3/oPvv\nzMaB4A00AF2H8+49ldfT8AANRAIB4oiXn/zuMGYP03lBJd+ev7XxB6NncQKBgFVf\nc3b14cDdiOnK3ggn+mN7DQpPyGdFnW+8loohe1vnThinX+LkheJZd2pbxPJFIW41\nMm5OuWoRmVl//MttZUNN7LYTPU34yb7FW8SEMkminWm698sLR0T63BR5wGXp/DiT\nVW2lcVxdJcPPs+Fkqk55U3Wnx74n9cZlvJpDEQEjAoGACaWZ8Qli5F9Xp5Fr4/Wy\nYIVQN6wkOb1sohIGACe0H8UejiqPpgMExPugEHxQRMzeoB9w52JbsOOofLHsZZYm\ndQKhQr5nVquZfT57rrP41aGl0Y2+10XR6Nc6c7uMTdVGbk+v0gdnS97WnKYpeZR/\nQOElRbGUx4EHt9l+pRyHnoM=\n-----END PRIVATE KEY-----\n".replace(/\\n/g, '\n'),
    }),
    
});

export default admin;

