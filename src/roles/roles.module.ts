import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './models/role.model';
import { AdminStrategy } from '../common/strategy/admin.strategy';

@Module({
  imports:[SequelizeModule.forFeature([Role])],
  controllers: [RolesController],
  providers: [RolesService,AdminStrategy],
})
export class RolesModule {}
