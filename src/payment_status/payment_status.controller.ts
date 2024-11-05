import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentStatusService } from './payment_status.service';
import { CreatePaymentStatusDto } from './dto/create-payment_status.dto';
import { UpdatePaymentStatusDto } from './dto/update-payment_status.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Payment_status } from './models/payment_status.model';

@ApiTags("Payment status")
@Controller("payment-status")
export class PaymentStatusController {
  constructor(private readonly paymentStatusService: PaymentStatusService) {}

  @ApiOperation({ summary: "Add new payment status" })
  @ApiResponse({
    status: 201,
    description: "Added new payment status",
    type: Payment_status,
  })
  @Post()
  create(@Body() createPaymentStatusDto: CreatePaymentStatusDto) {
    return this.paymentStatusService.create(createPaymentStatusDto);
  }

  @ApiOperation({ summary: "Get all payment statuses" })
  @ApiResponse({
    status: 200,
    description: "All payment statuses",
    type: [Payment_status],
  })
  @Get()
  findAll() {
    return this.paymentStatusService.findAll();
  }

  @ApiOperation({ summary: "Get payment statuse by id" })
  @ApiResponse({
    status: 200,
    description: "Found payment statuse by id",
    type: Payment_status,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.paymentStatusService.findOne(+id);
  }

  @ApiOperation({ summary: "Update payment statuse by ID" })
  @ApiResponse({
    status: 200,
    description: "Updated payment statuse",
    type: Payment_status,
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updatePaymentStatusDto: UpdatePaymentStatusDto
  ) {
    return this.paymentStatusService.update(+id, updatePaymentStatusDto);
  }

  @ApiOperation({ summary: "Delete payment statuse by ID" })
  @ApiResponse({
    status: 200,
    description: "Deleted payment statuse",
    type: Number,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.paymentStatusService.remove(+id);
  }
}
