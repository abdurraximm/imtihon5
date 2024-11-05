import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreatePaymentDto {
  @ApiProperty({ example: 1, description: "Enter orders's ID" })
  @IsNumber()
  orderId: number;

  @ApiProperty({ example: 1, description: "Enter payment type's ID" })
  @IsNumber()
  payment_typeId: number;

  @ApiProperty({ example: "2024-01-01", description: "Enter paymnet date" })
  @IsString()
  payment_date: Date;
  
  @ApiProperty({ example: 1, description: "Enter payment status' ID" })
  @IsNumber()
  payment_statusId: number;
}
