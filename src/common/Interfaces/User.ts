export interface IUser {
    readonly id?: number;
    readonly username?: string;
    readonly email?: string;
    readonly name?: string;
    readonly dateOfBirth?: Date;
    readonly phoneNumber?: string;
    readonly isPhoneVerified?: boolean;
    readonly isEmailVerified?: boolean;
    readonly verificationToken?: string;
    readonly profilePictureUrl?: string;
    readonly lastLogin?: Date;
    readonly isActive?: boolean;
    readonly address?: string;
    readonly city?: string;
    readonly state?: string;
    readonly country?: string;
    readonly zipCode?: string;
    readonly socialProvider?: string;
    readonly socialProviderId?: string;
}