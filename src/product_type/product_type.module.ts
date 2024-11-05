import { Module } from '@nestjs/common';
import { ProductTypeService } from './product_type.service';
import { ProductTypeController } from './product_type.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product_type } from './models/product_type.model';

@Module({
  imports:[SequelizeModule.forFeature([Product_type])],
  controllers: [ProductTypeController],
  providers: [ProductTypeService],
})
export class ProductTypeModule {}
