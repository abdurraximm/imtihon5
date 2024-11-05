import { Injectable } from '@nestjs/common';
import { CreatePublishedProductDto } from './dto/create-published_product.dto';
import { UpdatePublishedProductDto } from './dto/update-published_product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { PublishedProduct } from './models/published_product.model';

@Injectable()
export class PublishedProductsService {
  constructor(@InjectModel(PublishedProduct) private readonly publishedProductModel:typeof PublishedProduct){}

  create(createPublishedProductDto: CreatePublishedProductDto) {
    return this.publishedProductModel.create(createPublishedProductDto);
  }

  findAll() {
    return this.publishedProductModel.findAll({include:{all:true}})
  }

  findOne(id: number) {
    return this.publishedProductModel.findOne({where:{id},include:{all:true}});
  }

  async update(id: number, updatePublishedProductDto: UpdatePublishedProductDto) {
    const updated_published_product = await this.publishedProductModel.update(updatePublishedProductDto,{where:{id},returning:true})
    return updated_published_product[1][0]
  }

  remove(id: number) {
    return this.publishedProductModel.destroy({where:{id}});
  }
}
