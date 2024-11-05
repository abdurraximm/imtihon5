import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreatePublishedProductDto {
  @ApiProperty({ example: 1, description: "Enter product ID" })
  @IsNumber()
  orderId: number;
}
