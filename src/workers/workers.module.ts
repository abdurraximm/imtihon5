import { Module } from '@nestjs/common';
import { WorkersService } from './workers.service';
import { WorkersController } from './workers.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Worker } from './models/worker.model';
import { JwtModule } from '@nestjs/jwt';
import { AdminStrategy } from '../common/strategy/admin.strategy';

@Module({
  imports:[SequelizeModule.forFeature([Worker]), JwtModule.register({})],
  controllers: [WorkersController],
  providers: [WorkersService,AdminStrategy],
})
export class WorkersModule {}
