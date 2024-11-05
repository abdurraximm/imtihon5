import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateOrderDto {
  @ApiProperty({ example: 1, description: "Enter client's ID" })
  @IsNumber()
  clientId: number;

  @ApiProperty({ example: 1, description: "Enter product's ID" })
  @IsNumber()
  productId: number;

  @ApiProperty({
    example: "This product for students",
    description: "Enter about of produtc",
  })
  @IsString()
  product_about: string;

  @ApiProperty({
    example: "2024-02-02",
    description: "Enter deadline of order",
  })
  deadline: Date;

  @ApiProperty({ example: 300, description: "Enter amount of product" })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: 990000, description: "Enter total price of order" })
  @IsNumber()
  total_price: number;

  @ApiProperty({ example: "This field for dditional comment", description: "Enter additional comment" })
  @IsOptional()
  @IsString()
  additional_comment: string;
}
