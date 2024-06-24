import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { instructorService } from "../services/instructor.service";
import { CreateInstructorInput, Instructor, UpdateInstructorInput } from "src/graphql/InstructorModel";

@Resolver()
export class InstructorResolver {
    constructor(private instructorService: instructorService) { }

    @Query(() => Instructor, { name: 'GetAllInstructors' })
    async findAll() {

    }

    @Mutation(() => Instructor, { name: "CreateInstructor" })
    async create(@Args('createInstructorInput') createInstructorInput: CreateInstructorInput): Promise<unknown> {
        return await this.instructorService.create(createInstructorInput)
    }


    @Mutation(() => Instructor, { name: "UpdateInstructor" })
    async update(@Args('updateInstructorInput') updateInstructorInput: UpdateInstructorInput): Promise<unknown> {
        return await this.instructorService.update(updateInstructorInput)
    }


    @Mutation(() => Instructor, { name: "DeleteInstructor" })
    async delete() {
        return await this.instructorService.delete()

    }
}