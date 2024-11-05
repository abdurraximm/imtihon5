import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAdminDto {
  @ApiProperty({ example: "John Doe", description: "Enter admin's full name" })
  @IsString()
  full_name: string;

  @ApiProperty({ example: "john_doe", description: "Enter admin's username" })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: "password", description: "Enter admin's password" })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: "password",
    description: "Enter admin's confirm password",
  })
  @IsString()
  @IsNotEmpty()
  confirm_password: string;

  @ApiProperty({
    example: "This our admin",
    description: "Enter admin's descriptions",
  })
  @IsOptional()
  description: string;

  @ApiProperty({
    example: "true",
    description: "Enter admin is active",
  })
  @IsOptional()
  is_active: boolean;

  @ApiProperty({
    example: "false",
    description: "Enter admin is creator",
  })
  @IsOptional()
  is_creator: boolean;
}
