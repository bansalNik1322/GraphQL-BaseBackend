import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ChangePasswordInput, CreateUserInput, ForgotPasswordInput, LoginUserInput, UpdateUserInput, User, VerifyUserInput } from 'src/graphql/AuthModel'; // Adjust the path as per your project structure
import { AuthService } from '../services/auth.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/Guards/auth.guard';


@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService) { }


    @Query(() => [User], { name: 'GetAllUsers' })
    findAll() {
        return this.authService.findAll();
    }

    @Mutation(() => User, { name: "CreateUser" })
    async create(@Args('createUserInput') createUserInput: CreateUserInput) {
        try {
            const response = await this.authService.create(createUserInput)
            return response
        } catch (error) {
            throw error;
        }
    }

    @Mutation(() => User, { name: 'LoginUser' })
    async login(@Args('loginUserInput') loginUserInput: LoginUserInput): Promise<unknown> {
        try {
            return await this.authService.login(loginUserInput);
        } catch (error) {
            throw error;
        }
    }


    @Mutation(() => User, { name: 'UpdateUser' })
    @UseGuards(AuthGuard)
    async update(@Args('updateUserInput') UpdateUserInput: UpdateUserInput, @Context() context: any) {
        try {
            const userId = context.req.userData.userId
            return await this.authService.update(UpdateUserInput, userId)
        } catch (error) {
            throw error
        }
    }

    @Mutation(() => User, { name: 'DeleteAccount' })
    @UseGuards(AuthGuard)
    async deleteAccount(@Context() context: any): Promise<unknown> {
        const userId = await context.req.userData.userId
        return await this.authService.delete(userId);
    }

    @Mutation(() => User, { name: 'ChangePassword' })
    @UseGuards(AuthGuard)
    async changePassword(@Args('changePasswordInput') changePasswordInput: ChangePasswordInput, @Context() context: any) {
        const userId = await context.req.userData.userId
        return await this.authService.changePassword(userId, changePasswordInput)
    }


    @Mutation(() => User, { name: 'ForgotPassword' })
    async forgotPassword(@Args('forgotPasswordInput') forgotPasswordInput: ForgotPasswordInput): Promise<unknown> {
        return await this.authService.forgotPassword(forgotPasswordInput);
    }

    @Mutation(() => User, { name: "VerifyUser" })
    async verifyUser(@Args('verifyUserInput') verifyUserInput: VerifyUserInput): Promise<unknown> {
        return await this.authService.verifyOTP(verifyUserInput)
    }

    // @Mutation(() => Boolean, { name: 'resetPassword' })
    // async resetPassword(@Args('email') email: string, @Args('token') token: string, @Args('newPassword') newPassword: string): Promise<boolean> {
    //     return await this.authService.resetPassword(email, token, newPassword);
    // }

    // @Mutation(() => Boolean, { name: 'verifyEmail' })
    // async verifyEmail(@Args('email') email: string, @Args('token') token: string): Promise<boolean> {
    //     return await this.authService.verifyEmail(email, token);
    // }

    // @Mutation(() => Boolean, { name: 'resendVerificationEmail' })
    // async resendVerificationEmail(@Args('email') email: string): Promise<boolean> {
    //     return await this.authService.resendVerificationEmail(email);
    // }


    // @Mutation(() => Boolean, { name: 'updateEmailPreferences' })
    // async updateEmailPreferences(@Args('userId') userId: string, @Args('preferences') preferences: any): Promise<boolean> {
    //     return await this.authService.updateEmailPreferences(userId, preferences);
    // }

    // @Mutation(() => Boolean, { name: 'generateOTP' })
    // async generateOTP(@Args('userId') userId: string): Promise<boolean> {
    //     return await this.authService.generateOTP(userId);
    // }

    // @Mutation(() => Boolean, { name: 'verifyOTP' })
    // async verifyOTP(@Args('userId') userId: string, @Args('otp') otp: string): Promise<boolean> {
    //     return await this.authService.verifyOTP(userId, otp);
    // }

}
