import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthResolver } from './resolvers/auth.resolver';
import { PrismaService } from 'src/providers/prisma/prisma.server';
import { PasswordService } from './services/password.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/providers/email/email.service';


@Module({
    providers: [AuthService, AuthResolver, EmailService, PasswordService, JwtService, PrismaService],
    controllers: [],
    imports: [
        JwtModule.register({
            global: true,
            secret: "MysecretKey",
            signOptions: { expiresIn: '90d' },
        }),
    ]
})
export class AuthModule { }
