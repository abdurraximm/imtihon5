import { Injectable } from '@nestjs/common';
import { CreateProductTypeDto } from './dto/create-product_type.dto';
import { UpdateProductTypeDto } from './dto/update-product_type.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product_type } from './models/product_type.model';

@Injectable()
export class ProductTypeService {
  constructor(@InjectModel(Product_type) private readonly productTypeModel:typeof Product_type){}

  create(createProductTypeDto: CreateProductTypeDto) {
    return this.productTypeModel.create(createProductTypeDto);
  }

  findAll() {
    return this.productTypeModel.findAll({include:{all:true}});
  }

  findOne(id: number) {
    return this.productTypeModel.findOne({where:{id}, include:{all:true}});
  }

  async update(id: number, updateProductTypeDto: UpdateProductTypeDto) {
    const updated_product_type = await this.productTypeModel.update(updateProductTypeDto,{where:{id}, returning:true})
    return updated_product_type[1][0];
  }

  remove(id: number) {
    return this.productTypeModel.destroy({where:{id}});
  }
}
