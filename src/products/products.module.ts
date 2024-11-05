import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Products } from './models/product.model';
import { AdminGuard } from '../common/guards/admin.guard';
import { AdminStrategy } from '../common/strategy/admin.strategy';

@Module({
  imports:[SequelizeModule.forFeature([Products])],
  controllers: [ProductsController],
  providers: [ProductsService,AdminStrategy],
})
export class ProductsModule {}
