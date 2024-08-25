import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { EAccountType } from 'src/utils/enums/account.enum';

export class RegisterDto {
    @ApiProperty()
    @IsNotEmpty()
    @Transform(({ value }) => value.trim())
    firstName: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @Transform(({ value }) => value.trim())
    lastName: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    phoneNumber: string;
    
    @ApiProperty()
    @IsOptional()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    userId:  mongoose.Schema.Types.ObjectId;
    
    @ApiProperty()
    @IsNotEmpty()
    @MinLength(8)
    password: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @MinLength(8)
    confirmPassword: string;

    @ApiProperty()
    @IsEnum(EAccountType)
    type: EAccountType;
}

export class LoginDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    username: string
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string
}