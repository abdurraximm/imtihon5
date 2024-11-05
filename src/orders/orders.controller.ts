import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Order } from './models/order.model';

@ApiTags("Orders")
@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({ summary: "Add new order" })
  @ApiResponse({
    status: 201,
    description: "Added new order",
    type: Order,
  })
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @ApiOperation({ summary: "Get all orders" })
  @ApiResponse({
    status: 200,
    description: "All orders",
    type: [Order],
  })
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @ApiOperation({ summary: "Get order by id" })
  @ApiResponse({
    status: 200,
    description: "Found order by id",
    type: Order,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.ordersService.findOne(+id);
  }

  @ApiOperation({ summary: "Update order by ID" })
  @ApiResponse({
    status: 200,
    description: "Updated order",
    type: Order,
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @ApiOperation({ summary: "Delete order by ID" })
  @ApiResponse({
    status: 200,
    description: "Deleted order",
    type: Number,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.ordersService.remove(+id);
  }
}
