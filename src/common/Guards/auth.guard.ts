// auth.guard.ts
import { Injectable, CanActivate, ExecutionContext, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from 'src/modules/auth/services/password.service';
import { PrismaService } from 'src/providers/prisma/prisma.server';



@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private prisma: PrismaService,
        private passwordService: PasswordService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const gqlContext = GqlExecutionContext.create(context).getContext();
        const request = gqlContext.req;

        const authorizationHeader = request.headers.authorization
        if (!authorizationHeader) {
            throw new HttpException('No authorization header', HttpStatus.UNAUTHORIZED)
        }
        const token = authorizationHeader.split('Bearer ')[1];
        if (!token) {
            throw new HttpException('No token', HttpStatus.UNAUTHORIZED)
        }

        const isTokenValid = await this.passwordService.validateToken(token)

        if (!isTokenValid) {
            throw new HttpException('Invalid Token', HttpStatus.UNAUTHORIZED)
        }

        const { id } = await this.passwordService.gettingDataFromToken(token)
        if (!id) {
            throw new HttpException('Invalid Token', HttpStatus.UNAUTHORIZED)
        }

        const user = await this.prisma.user.findFirst({
            where: {
                id: id
            }
        })

        if (!user) {
            throw new HttpException('No user found, Invalid Token', HttpStatus.UNAUTHORIZED)
        }

        if (!user.status) {
            throw new HttpException("Your account is disabled!", HttpStatus.UNAUTHORIZED)
        }
        request.userData = {
            userId: id
        }
        return Promise.resolve(true)
    }
}