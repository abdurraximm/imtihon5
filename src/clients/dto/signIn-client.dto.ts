import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class SignInDto {
  @ApiProperty({
    example: "johndoe@gmail.com",
    description: "Enter client's email",
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: "password", description: "Enter client's password" })
  @IsString()
  @IsNotEmpty()
  password: string;
}
