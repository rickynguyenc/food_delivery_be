import { IsString, IsEmail, IsPhoneNumber, IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  address: string;

  @IsPhoneNumber()
  phone: string;

  @IsEmail()
  email: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsNumber()
  @IsOptional()
  rating?: number;
} 