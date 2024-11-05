import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber } from "class-validator";

export class CreateOrderStatusDto {
  @ApiProperty({ example: true, description: "Enter order status" })
  @IsBoolean()
  status: boolean;

   @ApiProperty({ example: 1, description: "Enter order ID" })
  @IsNumber()
  orderId:number
}
