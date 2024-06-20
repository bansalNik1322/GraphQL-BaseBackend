import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: "MysecretKey",
      signOptions: { expiresIn: '1800s' },
    }),

    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_SERVER,
        auth: {
          user: process.env.SMTP_LOGIN,
          pass: process.env.SMTP_PASSWORD,
        },
      },
    }),

    
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),

    AuthModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
