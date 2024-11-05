import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateProductTypeDto {
  @ApiProperty({ example: "Book", description: "Enter product's type" })
  @IsString()
  @IsNotEmpty()
  type_name: string;
}
