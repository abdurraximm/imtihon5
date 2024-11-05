import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import { JwtModule } from '@nestjs/jwt';
import { AdminSelfGuard } from '../common/guards/admin-self.guard';
import { CreatorGuard } from '../common/guards/creator.guard';
import { CreatorStrategy } from '../common/strategy/creator.strategy';
import { AdminStrategy } from '../common/strategy/admin.strategy';
import { AdminSelfStrategy } from '../common/strategy/admin-self.strategy';

@Module({
  imports:[SequelizeModule.forFeature([Admin]),JwtModule.register({})],
  controllers: [AdminsController],
  providers: [AdminsService,CreatorStrategy,AdminSelfStrategy],
  exports:[]
})
export class AdminsModule {}
