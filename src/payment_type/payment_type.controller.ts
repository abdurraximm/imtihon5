import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentTypeService } from './payment_type.service';
import { CreatePaymentTypeDto } from './dto/create-payment_type.dto';
import { UpdatePaymentTypeDto } from './dto/update-payment_type.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Payment_type } from './models/payment_type.model';

@ApiTags("Payment's type")
@Controller("payment-type")
export class PaymentTypeController {
  constructor(private readonly paymentTypeService: PaymentTypeService) {}

  @ApiOperation({ summary: "Add new payment type" })
  @ApiResponse({
    status: 201,
    description: "Added new payment type",
    type: Payment_type,
  })
  @Post()
  create(@Body() createPaymentTypeDto: CreatePaymentTypeDto) {
    return this.paymentTypeService.create(createPaymentTypeDto);
  }

  @ApiOperation({ summary: "Get all payment types" })
  @ApiResponse({
    status: 200,
    description: "All payment types",
    type: [Payment_type],
  })
  @Get()
  findAll() {
    return this.paymentTypeService.findAll();
  }

  @ApiOperation({ summary: "Get payment type by id" })
  @ApiResponse({
    status: 200,
    description: "Found payment type by id",
    type: Payment_type,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.paymentTypeService.findOne(+id);
  }

  @ApiOperation({ summary: "Update payment type by ID" })
  @ApiResponse({
    status: 200,
    description: "Updated payment type",
    type: Payment_type,
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updatePaymentTypeDto: UpdatePaymentTypeDto
  ) {
    return this.paymentTypeService.update(+id, updatePaymentTypeDto);
  }

  @ApiOperation({ summary: "Delete payment type by ID" })
  @ApiResponse({
    status: 200,
    description: "Deleted payment type",
    type: Number,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.paymentTypeService.remove(+id);
  }
}
