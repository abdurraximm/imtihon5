import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Products } from './models/product.model';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Products) private readonly productModel:typeof Products){}

  create(createProductDto: CreateProductDto) {
    return this.productModel.create(createProductDto);
  }

  findAll() {
    return this.productModel.findAll({include:{all:true}});
  }

  findOne(id: number) {
    return this.productModel.findOne({where:{id},include:{all:true}});
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const updated_product = await this.productModel.update(updateProductDto,{where:{id},returning:true})
    return updated_product[1][0];
  }

  remove(id: number) {
    return this.productModel.destroy({where:{id}});
  }
}
