import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './models/order.model';
import { or } from 'sequelize';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order) private readonly orderModel:typeof Order){}

  create(createOrderDto: CreateOrderDto) {
    return this.orderModel.create(createOrderDto);
  }

  findAll() {
    return this.orderModel.findAll({include:{all:true}});
  }

  findOne(id: number) {
    return this.orderModel.findOne({where:{id},include:{all:true}});
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const updated_order = await this.orderModel.update(updateOrderDto,{where:{id},returning:true})
    return updated_order[1][0];
  }

  remove(id: number) {
    return this.orderModel.destroy({where:{id}});
  }
}
