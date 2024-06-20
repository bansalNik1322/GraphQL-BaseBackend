import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
    constructor(private mailerService: MailerService) { }

    async sendMail(mail: string, message: string) {
        try {
            const sentMailInfo = await this.mailerService.sendMail({
                from: process.env.SMTP_FROM_EMAIL,
                to: mail,
                subject: `How to Send Emails with Nodemailer`,
                html: message,
            });
            return sentMailInfo
        } catch (error) {
            // throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
            console.log(error);

        }
    }
}
