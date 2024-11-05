import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AdminsModule } from '../admins/admins.module';
import { Sequelize } from 'sequelize';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from '../admins/models/admin.model';
import { CreatorStrategy } from '../common/strategy/creator.strategy';

@Module({
  imports: [
    SequelizeModule.forFeature([Admin]),JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService,CreatorStrategy],
})
export class AuthModule {}
