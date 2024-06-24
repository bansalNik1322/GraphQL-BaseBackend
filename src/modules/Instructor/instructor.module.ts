import { Module } from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma/prisma.server';
import { EmailService } from 'src/providers/email/email.service';


@Module({
    providers: [PrismaService, EmailService],
    imports: []
})
export class InstructorModule { }
