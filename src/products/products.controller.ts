import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Products } from './models/product.model';
import { AdminGuard } from '../common/guards/admin.guard';

@ApiTags("Products")
@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: "Add new proudct" })
  @ApiResponse({
    status: 201,
    description: "Added new proudct",
    type: Products,
  })
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @ApiOperation({ summary: "Get all products" })
  @ApiResponse({
    status: 200,
    description: "All products",
    type: [Products],
  })
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @ApiOperation({ summary: "Get product by id" })
  @ApiResponse({
    status: 200,
    description: "Found product by id",
    type: Products,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.productsService.findOne(+id);
  }

  @ApiOperation({ summary: "Update product by ID" })
  @ApiResponse({
    status: 200,
    description: "Updated product",
    type: Products,
  })
  @UseGuards(AdminGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @ApiOperation({ summary: "Delete product by ID" })
  @ApiResponse({
    status: 200,
    description: "Deleted product",
    type: Number,
  })
  @UseGuards(AdminGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.productsService.remove(+id);
  }
}
