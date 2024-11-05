import { Module } from '@nestjs/common';
import { PaymentTypeService } from './payment_type.service';
import { PaymentTypeController } from './payment_type.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Payment_type } from './models/payment_type.model';

@Module({
  imports:[SequelizeModule.forFeature([Payment_type])],
  controllers: [PaymentTypeController],
  providers: [PaymentTypeService],
})
export class PaymentTypeModule {}
