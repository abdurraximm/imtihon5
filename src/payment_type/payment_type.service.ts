import { Injectable } from '@nestjs/common';
import { CreatePaymentTypeDto } from './dto/create-payment_type.dto';
import { UpdatePaymentTypeDto } from './dto/update-payment_type.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Payment_type } from './models/payment_type.model';

@Injectable()
export class PaymentTypeService {
  constructor(@InjectModel(Payment_type) private readonly paymentTypeModel:typeof Payment_type){}

  create(createPaymentTypeDto: CreatePaymentTypeDto) {
    return this.paymentTypeModel.create(createPaymentTypeDto);
  }

  findAll() {
    return this.paymentTypeModel.findAll({include:{all:true}});
  }

  findOne(id: number) {
    return this.paymentTypeModel.findOne({where:{id},include:{all:true}});
  }

  async update(id: number, updatePaymentTypeDto: UpdatePaymentTypeDto) {
    const updated_payment_type = await this.paymentTypeModel.update(updatePaymentTypeDto,{where:{id},returning:true})
    return updated_payment_type[1][0];
  }

  remove(id: number) {
    return this.paymentTypeModel.destroy({where:{id}});
  }
}
