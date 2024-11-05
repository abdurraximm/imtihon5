import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PublishedProductsService } from './published_products.service';
import { CreatePublishedProductDto } from './dto/create-published_product.dto';
import { UpdatePublishedProductDto } from './dto/update-published_product.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PublishedProduct } from './models/published_product.model';

@ApiTags("Published products")
@Controller("published-products")
export class PublishedProductsController {
  constructor(
    private readonly publishedProductsService: PublishedProductsService
  ) {}

  @ApiOperation({ summary: "Add new published proudct" })
  @ApiResponse({
    status: 201,
    description: "Added new published proudct",
    type: PublishedProduct,
  })
  @Post()
  create(@Body() createPublishedProductDto: CreatePublishedProductDto) {
    return this.publishedProductsService.create(createPublishedProductDto);
  }

  @ApiOperation({ summary: "Get all published products" })
  @ApiResponse({
    status: 200,
    description: "All published products",
    type: [PublishedProduct],
  })
  @Get()
  findAll() {
    return this.publishedProductsService.findAll();
  }

  @ApiOperation({ summary: "Get published product by id" })
  @ApiResponse({
    status: 200,
    description: "Found published product by id",
    type: PublishedProduct,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.publishedProductsService.findOne(+id);
  }

  @ApiOperation({ summary: "Update published product by ID" })
  @ApiResponse({
    status: 200,
    description: "Updated published product",
    type: PublishedProduct,
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updatePublishedProductDto: UpdatePublishedProductDto
  ) {
    return this.publishedProductsService.update(+id, updatePublishedProductDto);
  }

  @ApiOperation({ summary: "Delete published product by ID" })
  @ApiResponse({
    status: 200,
    description: "Deleted published product",
    type: Number,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.publishedProductsService.remove(+id);
  }
}
