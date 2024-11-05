import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class SignInDto {
  @ApiProperty({ example: "john_doe", description: "Enter admin's username" })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({ example: "password", description: "Enter worker's password" })
  @IsString()
  @IsNotEmpty()
  password: string;
}
