import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, IsOptional, MinLength, MaxLength, IsEnum } from 'class-validator';
import { EAccountType } from 'src/utils/enums';  // Adjust the import according to your project structure

export class RegisterDto {
  @ApiProperty({
    description: 'The phone number of the user',
    example: '+1234567890'
  })
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    description: 'The username for the account',
    example: 'john_doe'
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @ApiProperty({
    description: 'The password for the account',
    example: 'P@ssw0rd123'
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'The type of the account',
    example: EAccountType.TELEGRAM_BOT,
    enum: EAccountType
  })
  @IsEnum(EAccountType)
  type: EAccountType;

  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
    required: false
  })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({
    description: 'The last name of the user',
    example: 'Doe',
    required: false
  })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'john.doe@example.com',
    required: false
  })
  @IsOptional()
  @IsEmail()
  email?: string;
}


export class LoginDto {
  @ApiProperty({
    description: 'The username for the account',
    example: 'john_doe'
  })
  @IsNotEmpty()
  @IsString()
  username: string


  @ApiProperty({
    description: 'The password for the account',
    example: 'P@ssw0rd123'
  })
  @IsNotEmpty()
  @IsString()
  password: string
}