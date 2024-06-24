import { ObjectType, Field, ID, Float, InputType } from '@nestjs/graphql'

@ObjectType()
export class Course {
    @Field(type => ID)
    courseId!: number;

    @Field({ nullable: true })
    courseImage?: string;

    @Field()
    courseName!: string;

    @Field()
    courseCategory!: string;

    @Field({ nullable: true })
    courseSubCategory?: string;

    @Field(type => Float, { nullable: true })
    avgRating?: number;

    @Field()
    totalEnrolled!: number;

    @Field()
    isDraft!: boolean;

    @Field()
    registrationDate!: Date;

    @Field()
    status!: boolean;

    @Field({ nullable: true })
    description?: string;

    @Field(type => ID, { nullable: true })
    instructorId?: number;
}

@InputType()
export class CreateCourseInput{
    @Field(type => ID)
    courseId!: number;

    @Field({ nullable: true })
    courseImage?: string;

    @Field()
    courseName!: string;

    @Field()
    courseCategory!: string;

    @Field({ nullable: true })
    courseSubCategory?: string;

    @Field(type => Float, { nullable: true })
    avgRating?: number;

    @Field()
    totalEnrolled!: number;

    @Field()
    isDraft!: boolean;

    @Field()
    registrationDate!: Date;

    @Field()
    status!: boolean;

    @Field({ nullable: true })
    description?: string;

    @Field(type => ID, { nullable: true })
    instructorId?: number;
}