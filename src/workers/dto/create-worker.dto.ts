import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from "class-validator";

export class CreateWorkerDto {
  @ApiProperty({ example: "JohnDoe", description: "Enter worker's name" })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({ example: 1, description: "Enter worker's role ID" })
  @IsNumber()
  roleId: number;

  @ApiProperty({
    example: "+998991234567",
    description: "Enter worker's phone number",
  })
  @IsPhoneNumber("UZ")
  phone_number: string;

  @ApiProperty({ example: "password", description: "Enter worker's password" })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: "password",
    description: "Enter worker's confirm password",
  })
  @IsString()
  @IsNotEmpty()
  confirm_password: string;

  @ApiProperty({
    example: true,
    description: "Enter worker's is active",
  })
  @IsBoolean()
  @IsOptional()
  is_active: boolean;
}
