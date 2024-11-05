import { Module } from '@nestjs/common';
import { PublishedProductsService } from './published_products.service';
import { PublishedProductsController } from './published_products.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PublishedProduct } from './models/published_product.model';

@Module({
  imports:[SequelizeModule.forFeature([PublishedProduct])],
  controllers: [PublishedProductsController],
  providers: [PublishedProductsService],
})
export class PublishedProductsModule {}
