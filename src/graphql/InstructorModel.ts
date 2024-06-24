import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { IsAlphanumeric, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MinLength } from "class-validator";

@ObjectType()
export class Instructor {
    @Field(() => Int, { nullable: true })
    readonly id?: number;

    @Field({ nullable: true })
    readonly email?: string;

    @Field({ nullable: true })
    readonly name?: string;


    @Field(() => Date, { nullable: true })
    readonly dateOfBirth?: Date;

    @Field({ nullable: true })
    readonly phoneNumber?: string;

    @Field({ nullable: true })
    readonly isPhoneVerified?: boolean;

    @Field({ nullable: true })
    readonly isEmailVerified?: boolean;

    @Field({ nullable: true })
    readonly verificationToken?: string;

    @Field({ nullable: true })
    readonly profilePictureUrl?: string;

    @Field(() => Date, { nullable: true })
    readonly lastLogin?: Date;

    @Field({ nullable: true })
    readonly isActive?: boolean;

    @Field({ nullable: true })
    readonly address?: string;

    @Field({ nullable: true })
    readonly city?: string;

    @Field({ nullable: true })
    readonly state?: string;

    @Field({ nullable: true })
    readonly country?: string;

    @Field({ nullable: true })
    readonly zipCode?: string
    @Field({ nullable: true })
    readonly accessToken?: string
}

@InputType()
export class CreateInstructorInput {

    @Field({ nullable: true })
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email: string;

    @Field({ nullable: true })
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;

    @Field({ nullable: true })
    @IsNotEmpty()
    @IsString()
    name: string;

    @Field(() => Date, { nullable: true })
    @IsOptional()
    dateOfBirth?: Date;

    @Field({ nullable: true })
    @IsOptional()
    @IsPhoneNumber()
    phoneNumber?: string;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    address?: string;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    city?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    state?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    country?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    zipCode?: string;
}


@InputType()
export class UpdateInstructorInput {

    @Field({ nullable: true })
    @IsOptional()
    @IsEmail()
    @IsString()
    email?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    @MinLength(8)
    password?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    name?: string

    @Field(() => Date, { nullable: true })
    @IsOptional()
    dateOfBirth?: Date;

    @Field({ nullable: true })
    @IsOptional()
    @IsPhoneNumber()
    phoneNumber?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    profilePictureUrl?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    address?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    city?: string;

    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    state?: string;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    country?: string;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    zipCode?: string;
}