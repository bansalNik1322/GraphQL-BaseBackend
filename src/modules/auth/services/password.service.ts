import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt";
import { jwtDecode } from "jwt-decode";
import { IJWTPayload } from "src/common/Interfaces/common";
import { PrismaService } from "src/providers/prisma/prisma.server";
import { EmailService } from "src/providers/email/email.service";
import { forgotPasswordEmailTemplate } from "src/common/template/forgotPassword";
import { ProfileVerificationEmailTemplate } from "src/common/template/profileVerification";

@Injectable()
export class PasswordService {

    constructor(
        private jwtService: JwtService,
        private prisma: PrismaService,
        private emailService: EmailService
    ) { }


    public async validatePassword(password: string, hashedPassword: string) {
        return await bcrypt.compare(password, hashedPassword)
    }


    public async encryptPassword(password: string) {
        const salt: string = await bcrypt.genSalt(10)
        const hashedPassword: string = await bcrypt.hash(password, salt)
        return hashedPassword
    }

    public async generateAccessToken(payload: IJWTPayload) {
        const token = await this.jwtService.signAsync(payload, { expiresIn: '90d', secret: "THISISOURJWTSECRET" });
        return token
    }

    // public async generateRefreshToken(payload: IPayloadUserJWT) {
    //     const token = await this.jwtService.signAsync(payload, { expiresIn: '90d' });
    //     return token
    // }

    public async gettingDataFromToken(token: string) {
        const decoded: IJWTPayload = jwtDecode(token)
        return { id: decoded.userId }
    }

    public async generateOTP(): Promise<string> {
        const characters = '0123456789';
        let OTP = '';
        const length = 6;

        for (let i = 0; i < length; i++) {
            const index = Math.floor(Math.random() * characters.length);
            OTP += characters[index];
        }
        return OTP;
    }


    public async validateToken(token: string) {
        try {
            await this.jwtService.verifyAsync(token, {
                secret: "THISISOURJWTSECRET"
            });
            return true;
        } catch (error) {
            return false;
        }
    }


    public async sendOTP(userId: number, slug: string) {
        console.log("🚀 ~ PasswordService ~ sendOTP ~ slug:", slug)
        try {
            const otp = await this.generateOTP()
            console.log("🚀 ~ PasswordService ~ sendOTP ~ otp:", otp)
            const user = await this.prisma.user.findFirst({
                where: {
                    id: userId
                }
            })
            if (!user) {
                throw new HttpException("User Not Found", HttpStatus.BAD_REQUEST)
            }

            const lastSendTime: any = user.lastOtpSentAt;
            const currentTime: any = new Date();
            const timeDifference = currentTime - lastSendTime;
            const hoursDifference = timeDifference / (1000 * 60 * 60); // Convert milliseconds to hours

            if (hoursDifference < 24 && user.otpAttempts >= 5) {
                throw new HttpException("Your maximum OTP limit has been reached for the last 24 hours.", HttpStatus.BAD_REQUEST)
            }


            let message;
            if (slug === 'forgot_password') {
                message = await forgotPasswordEmailTemplate.replace("{{otp}}", otp)
                this.emailService.sendMail(user.email, message)
            } else if (slug === 'profile_verification') {
                message = ProfileVerificationEmailTemplate.replace("{{otp}}", otp)
                this.emailService.sendMail(user.email, message)
            }


            await this.prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    otp: otp,
                    otpAttempts: user.otpAttempts + 1,
                    lastOtpSentAt: new Date()

                }
            })



            return otp

        } catch (error) {
            throw error
        }
    }
}