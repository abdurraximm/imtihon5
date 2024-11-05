import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty } from "class-validator";

export class CreatePaymentStatusDto {
  @ApiProperty({ example: true, description: "Enter payment's status" })
  @IsBoolean()
  @IsNotEmpty()
  status: boolean;
}
