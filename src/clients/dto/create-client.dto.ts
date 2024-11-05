import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class CreateClientDto {
  @ApiProperty({ example: "John", description: "Enter client's first name" })
  @IsString()
  first_name: string;

  @ApiProperty({ example: "Doe", description: "Enter client's last name" })
  @IsString()
  last_name: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Enter client's phone number(Phone number of Uzbekistan)",
  })
  @IsPhoneNumber("UZ")
  phone_number: string;

  @ApiProperty({
    example: "johndoe@gmail.com",
    description: "Enter clinet's email",
  })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "password", description: "Enter client's password" })
  @IsString()
  @IsNotEmpty()
  password: string;
}
