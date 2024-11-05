import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductTypeService } from './product_type.service';
import { CreateProductTypeDto } from './dto/create-product_type.dto';
import { UpdateProductTypeDto } from './dto/update-product_type.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Product_type } from './models/product_type.model';

@ApiTags("Product's type")
@Controller("product-type")
export class ProductTypeController {
  constructor(private readonly productTypeService: ProductTypeService) {}

  @ApiOperation({ summary: "Add new proudct type" })
  @ApiResponse({
    status: 201,
    description: "Added new payment proudct",
    type: Product_type,
  })
  @Post()
  create(@Body() createProductTypeDto: CreateProductTypeDto) {
    return this.productTypeService.create(createProductTypeDto);
  }

  @ApiOperation({ summary: "Get all product types" })
  @ApiResponse({
    status: 200,
    description: "All product types",
    type: [Product_type],
  })
  @Get()
  findAll() {
    return this.productTypeService.findAll();
  }

  @ApiOperation({ summary: "Get product type by id" })
  @ApiResponse({
    status: 200,
    description: "Found product type by id",
    type: Product_type,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.productTypeService.findOne(+id);
  }

  @ApiOperation({ summary: "Update product type by ID" })
  @ApiResponse({
    status: 200,
    description: "Updated product type",
    type: Product_type,
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateProductTypeDto: UpdateProductTypeDto
  ) {
    return this.productTypeService.update(+id, updateProductTypeDto);
  }

  @ApiOperation({ summary: "Delete product type by ID" })
  @ApiResponse({
    status: 200,
    description: "Deleted product type",
    type: Number,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.productTypeService.remove(+id);
  }
}
