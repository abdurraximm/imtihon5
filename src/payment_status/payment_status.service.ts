import { Injectable } from '@nestjs/common';
import { CreatePaymentStatusDto } from './dto/create-payment_status.dto';
import { UpdatePaymentStatusDto } from './dto/update-payment_status.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Payment_status } from './models/payment_status.model';

@Injectable()
export class PaymentStatusService {
  constructor(@InjectModel(Payment_status) private readonly paymentStatusModel:typeof Payment_status){}

  create(createPaymentStatusDto: CreatePaymentStatusDto) {
    return this.paymentStatusModel.create(createPaymentStatusDto);
  }

  findAll() {
    return this.paymentStatusModel.findAll({include:{all:true}});
  }

  findOne(id: number) {
    return this.paymentStatusModel.findOne({where:{id}, include:{all:true}});
  }

  async update(id: number, updatePaymentStatusDto: UpdatePaymentStatusDto) {
    const updated_payment_status = await this.paymentStatusModel.update(updatePaymentStatusDto,{where:{id}, returning:true})
    return updated_payment_status[1][0];
  }

  remove(id: number) {
    return this.paymentStatusModel.destroy({where:{id}});
  }
}
