import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
  @ApiProperty({
    example: "This book for school pupils",
    description: "Enter product's descriptions",
  })
  @IsString()
  @IsNotEmpty()
  descriptions: string;

  @ApiProperty({ example: 1, description: "Enter product type ID" })
  @IsNumber()
  product_typeId: number;
}
