import { Injectable } from '@nestjs/common';
import { CreateOrderStatusDto } from './dto/create-order_status.dto';
import { UpdateOrderStatusDto } from './dto/update-order_status.dto';
import { InjectModel } from '@nestjs/sequelize';
import { OrderStatus } from './models/order_status.model';
import { or } from 'sequelize';

@Injectable()
export class OrderStatusService {
    constructor(@InjectModel(OrderStatus) private readonly orderStatusModel:typeof OrderStatus){}

  create(createOrderStatusDto: CreateOrderStatusDto) {
    return this.orderStatusModel.create(createOrderStatusDto);
  }

  findAll() {
    return this.orderStatusModel.findAll({include:{all:true}});
  }

  findOne(id: number) {
    return this.orderStatusModel.findOne({where:{id},include:{all:true}});
  }

  async update(id: number, updateOrderStatusDto: UpdateOrderStatusDto) {
    const updated_order_status = await this.orderStatusModel.update(updateOrderStatusDto,{where:{id},returning:true})
    return updated_order_status[1][0];
  }

  remove(id: number) {
    return this.orderStatusModel.destroy({where:{id}});
  }
}
