import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateInstructorInput, UpdateInstructorInput } from "src/graphql/InstructorModel";
import { PasswordService } from "src/modules/auth/services/password.service";
import { PrismaService } from "src/providers/prisma/prisma.server";

@Injectable()
export class instructorService {
    constructor(private prisma: PrismaService,
        private passwordService: PasswordService
    ) { }


    async findAll(): Promise<unknown> {
        try {
            return []
        } catch (error) {

        }
    }


    async create(payload: CreateInstructorInput): Promise<unknown> {
        try {
            const isExist = await this.prisma.instructor.findFirst({
                where: {
                    email: payload.email
                }
            })
            if (isExist) throw new HttpException("Email Already Exists.", HttpStatus.CONFLICT);


            const hashedPassword: string = await this.passwordService.encryptPassword(payload.password)
            const newInstructor = await this.prisma.instructor.create({
                data: {
                    email: payload.email,
                    password: hashedPassword,
                    name: payload.name,
                }
            });
            this.passwordService.sendOTP(newInstructor.id, 'profile_verification');

            return newInstructor

        } catch (error) {

        }
    }

    async update(payload: UpdateInstructorInput): Promise<unknown> {
        try {
            // const instructor = await this.prisma.instructor.findFirst({
            //     where : {
            //         id:
            //     }
            // })
            return

        } catch (error) {

        }
    }

    async delete(): Promise<unknown> {
        try {
            return
        } catch (error) {

        }
    }
}