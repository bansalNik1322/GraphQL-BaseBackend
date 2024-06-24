import { Resolver, Query, Mutation } from "@nestjs/graphql";
import { Course } from "src/graphql/CourseModel";
import { CourseService } from "../services/course.service";

@Resolver()

export class CourseResolver {

    constructor(
        private courseService: CourseService
    ) { }

    @Query(() => [Course], { name: "GetAllCourses" })
    findAll() {

    }


    @Mutation(() => Course, {name : "AddCourse"})
    async addCourse(){
        
    }

}