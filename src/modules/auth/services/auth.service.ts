import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ChangePasswordInput, CreateUserInput, ForgotPasswordInput, LoginUserInput, ResendVerificationEmailInput, UpdateUserInput, VerifyUserInput } from "src/graphql/AuthModel";
import { PrismaService } from "src/providers/prisma/prisma.server";
import { PasswordService } from "./password.service";
import { IJWTPayload } from "src/common/Interfaces/common";
import { userSelectionFields } from "src/common/utils/selectionField";
import { differenceInMinutes } from "date-fns";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private passwordService: PasswordService) { }
    public async findAll(): Promise<unknown> {
        try {
            const users = await this.prisma.user.findMany({
                where: {
                    status: true
                }
            })
            return users

        } catch (error) {
            throw error;
        }
    }

    public async create(payload: CreateUserInput) {

        try {
            const isExist = await this.prisma.user.findFirst({
                where: {
                    email: payload.email
                }
            })

            const usernameExistOrNot = await this.prisma.user.findFirst({
                where: {
                    username: payload.username
                }
            })
            if (isExist) throw new HttpException("Email Already Exists.", HttpStatus.CONFLICT);
            if (usernameExistOrNot) throw new HttpException("Username Already Taken.", HttpStatus.CONFLICT);


            const hashedPassword: string = await this.passwordService.encryptPassword(payload.password)
            const newUser = await this.prisma.user.create({
                data: {
                    username: payload.username,
                    email: payload.email,
                    password: hashedPassword,
                    name: payload.name,
                }
            });
            this.passwordService.sendOTP(newUser.id, 'profile_verification');

            return newUser

        } catch (error) {
            throw error;
        }
    }


    async login(payload: LoginUserInput): Promise<unknown> {
        try {
            let user;
            if (payload.username) {
                user = await this.prisma.user.findFirst({
                    where: {
                        username: payload.username
                    }
                });
                if (!user) {
                    throw new HttpException("Invalid Credentials", HttpStatus.BAD_REQUEST);
                }


            } else if (payload.email) {
                user = await this.prisma.user.findFirst({
                    where: {
                        email: payload.email
                    }
                });
                if (!user) {
                    throw new HttpException("Invalid Credentials", HttpStatus.BAD_REQUEST);
                }
            }
            if (!user.status) {
                throw new HttpException("Invalid Credentials", HttpStatus.BAD_REQUEST);
            }
            if (!user.isActive) {
                this.passwordService.sendOTP(user.id, "profile_verification")
                throw new HttpException("Your accound is disabled temperarily.", HttpStatus.BAD_REQUEST);
            }

            if (!user.isPhoneVerified && !user.isEmailVerified) {
                throw new HttpException("Your profile is not verified", HttpStatus.BAD_REQUEST)
            }



            const isCorrectPassword = await this.passwordService.validatePassword(payload.password, user.password);
            if (!isCorrectPassword) {
                throw new HttpException("Invalid Credentials", HttpStatus.BAD_REQUEST);
            }

            const JWTPayload: IJWTPayload = {
                userId: user.id
            };
            const token = await this.passwordService.generateAccessToken(JWTPayload);

            return {
                accessToken: token,
            };
        } catch (error) {
            throw error;
        }
    };



    public async update(payload: UpdateUserInput, userId: number) {
        try {
            const user = await this.prisma.user.findFirst({
                where: {
                    id: userId
                }
            })

            if (!user) throw new HttpException("Invalid UserID", HttpStatus.BAD_REQUEST);
            const existingUsername = await this.prisma.user.findFirst({
                where: {
                    username: payload.username
                }
            })
            if (existingUsername && existingUsername.id !== user.id) throw new HttpException("Username Already Taken.", HttpStatus.CONFLICT);

            const updateUser = await this.prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    ...payload
                }
            })

            return updateUser
        } catch (error) {
            throw error;
        }
    }

    async delete(userId: number): Promise<unknown> {
        try {
            const user = await this.prisma.user.findFirst({
                where: {
                    id: userId
                }
            })
            if (!user) throw new HttpException("Invalid UserID", HttpStatus.BAD_REQUEST);

            await this.prisma.user.update({
                where: { id: userId },
                data: {
                    status: false
                }
            })
            return {
                status: true,
                code: HttpStatus.OK,
                message: "Account Deleted"
            }
        } catch (error) {
            throw error
        }
    }


    public async changePassword(userId: number, payload: ChangePasswordInput) {
        try {
            const user = await this.prisma.user.findFirst({
                where: {
                    id: userId
                }
            })
            if (!user) throw new HttpException("Invalid UserID", HttpStatus.BAD_REQUEST);
            const isCorrectPassword = await this.passwordService.validatePassword(payload.oldPassword, user.password)
            if (!isCorrectPassword) throw new HttpException("Please provide correct old password", HttpStatus.BAD_REQUEST);

            const hashedPassword: string = await this.passwordService.encryptPassword(payload.newPassword)
            const updatedUser = await this.prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    password: hashedPassword
                }
            })
            return updatedUser
        } catch (error) {
            throw error
        }
    }

    async forgotPassword(payload: ForgotPasswordInput): Promise<unknown> {
        try {
            let user;
            if (payload.username) {
                user = await this.prisma.user.findFirst({
                    where: {
                        username: payload.username
                    },
                    select: {
                        ...userSelectionFields
                    }
                })
                if (!user) {
                    throw new HttpException("No user found with this username!", HttpStatus.BAD_REQUEST)
                }
            } else if (payload.email) {
                user = await this.prisma.user.findFirst({
                    where: {
                        email: payload.email
                    }
                })
                if (!user) {
                    throw new HttpException("No user found with this email!", HttpStatus.BAD_REQUEST)
                }
            }

            await this.passwordService.sendOTP(user.id, 'forgot_password')
            return {
                status: true,
                code: HttpStatus.OK,
                message: "OTP Sent!",
                ...user
            }

        } catch (error) {
            throw error;
        }
    }

    async resetPassword(password: string, userId: number): Promise<unknown> {
        try {
            const user = await this.prisma.user.findFirst({
                where: {
                    id: userId
                },
                select: {
                    ...userSelectionFields
                }
            })
            if (!user) {
                throw new HttpException("Invalid UserID", HttpStatus.BAD_REQUEST)
            }


            const hashedPassword = await this.passwordService.encryptPassword(password)
            await this.prisma.user.update({
                where: {
                    id: userId
                }, data: {
                    password: password
                }
            })

            return {
                status: true,
                code: HttpStatus.OK,
                message: "OTP Sent!",
                ...user
            }
        } catch (error) {
            throw error
        }
    }

    async resendVerificationEmail(payload: ResendVerificationEmailInput): Promise<unknown> {
        try {
            const user = await this.prisma.user.findFirst({
                where: {
                    email: payload.email
                },
                select: {
                    ...userSelectionFields
                }
            })
            if (!user) {
                throw new HttpException("Email Not Found!", HttpStatus.BAD_REQUEST)
            }

            await this.passwordService.sendOTP(user.id, payload.slug)

            return {
                status: true,
                code: HttpStatus.OK,
                message: "OTP Sent!",
                ...user
            }

        } catch (error) {
            throw error
        }
    }

    async verifyEmail(email: string, token: string): Promise<boolean> {
        // Example implementation
        // Verify email using verification token
        return true;
    }


    async updateEmailPreferences(userId: string, preferences: any): Promise<boolean> {
        // Example implementation
        // Update user's email preferences
        return true;
    }

    async generateOTP(userId: string): Promise<boolean> {
        // Example implementation
        // Generate OTP (One-Time Password) for user
        return true;
    }

    async verifyOTP(payload: VerifyUserInput): Promise<unknown> {
        try {
            const user = await this.prisma.user.findFirst({
                where: {
                    email: payload?.email
                },
                select: {
                    ...userSelectionFields, otp: true,
                    lastOtpSentAt: true
                }
            })
            if (!user) throw new HttpException('Invalid Email', HttpStatus.BAD_REQUEST)

            if (payload?.otp !== user?.otp) throw new HttpException('Incorrect OTP', HttpStatus.BAD_REQUEST)

            const diffInMinutes = differenceInMinutes(new Date(), user?.lastOtpSentAt);

            if (diffInMinutes > 10) throw new HttpException('OTP Expired! Please Try Again.', HttpStatus.BAD_REQUEST)


            await this.prisma.user.update({
                where: {
                    email: payload.email
                },
                data: {
                    isEmailVerified: true,
                    otpAttempts: 0,
                    otp: null
                }
            })

            return {
                status: true,
                code: HttpStatus.OK,
                message: "OTP Verified!",
                ...user
            }
        } catch (error) {
            throw error
        }
    }
}