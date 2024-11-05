import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderStatusService } from './order_status.service';
import { CreateOrderStatusDto } from './dto/create-order_status.dto';
import { UpdateOrderStatusDto } from './dto/update-order_status.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderStatus } from './models/order_status.model';

@ApiTags("Order status")
@Controller("order-status")
export class OrderStatusController {
  constructor(private readonly orderStatusService: OrderStatusService) {}

  @ApiOperation({ summary: "Add new order status" })
  @ApiResponse({
    status: 201,
    description: "Added new order status",
    type: OrderStatus,
  })
  @Post()
  create(@Body() createOrderStatusDto: CreateOrderStatusDto) {
    return this.orderStatusService.create(createOrderStatusDto);
  }

  @ApiOperation({ summary: "Get all order status" })
  @ApiResponse({
    status: 200,
    description: "All order status",
    type: [OrderStatus],
  })
  @Get()
  findAll() {
    return this.orderStatusService.findAll();
  }

  @ApiOperation({ summary: "Get order status by id" })
  @ApiResponse({
    status: 200,
    description: "Found order status by id",
    type: OrderStatus,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.orderStatusService.findOne(+id);
  }

  @ApiOperation({ summary: "Update order status by ID" })
  @ApiResponse({
    status: 200,
    description: "Updated order status",
    type: OrderStatus,
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto
  ) {
    return this.orderStatusService.update(+id, updateOrderStatusDto);
  }

  @ApiOperation({ summary: "Delete order status by ID" })
  @ApiResponse({
    status: 200,
    description: "Deleted order status",
    type: Number,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.orderStatusService.remove(+id);
  }
}
