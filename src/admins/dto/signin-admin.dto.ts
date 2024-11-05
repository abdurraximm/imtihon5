import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class SignInDto {
  @ApiProperty({ example: "john_doe", description: "Enter admin's username" })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: "password", description: "Enter admin's password" })
  @IsString()
  @IsNotEmpty()
  password: string;
}
