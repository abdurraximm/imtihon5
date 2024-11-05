import { Module } from '@nestjs/common';
import { PaymentStatusService } from './payment_status.service';
import { PaymentStatusController } from './payment_status.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Payment_status } from './models/payment_status.model';

@Module({
  imports:[SequelizeModule.forFeature([Payment_status])],
  controllers: [PaymentStatusController],
  providers: [PaymentStatusService],
})
export class PaymentStatusModule {}
