import { Module } from '@nestjs/common';
import { AdminController } from './controllers/Admin.controller';
import { AdminServices } from './services/admin.service';


@Module({
  controllers: [AdminController],
  providers: [AdminServices]
})
export class AdminModule { }
