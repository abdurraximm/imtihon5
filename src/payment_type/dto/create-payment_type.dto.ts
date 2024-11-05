import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreatePaymentTypeDto {
  @ApiProperty({ example: "Card", description: "Enter payment's type" })
  @IsString()
  @IsNotEmpty()
  type_name: string;
}
