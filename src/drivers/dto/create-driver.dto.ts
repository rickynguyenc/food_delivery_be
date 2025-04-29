import { IsString, IsEmail, IsPhoneNumber, IsEnum, IsOptional, IsNumber } from 'class-validator';
import { DriverStatus } from '../enums/driver-status.enum';

export class CreateDriverDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phoneNumber: string;

  @IsString()
  vehicleType: string;

  @IsString()
  vehiclePlateNumber: string;

  @IsEnum(DriverStatus)
  status: DriverStatus;

  @IsOptional()
  @IsNumber()
  currentLatitude?: number;

  @IsOptional()
  @IsNumber()
  currentLongitude?: number;

  @IsOptional()
  @IsString()
  profilePicture?: string;

  @IsOptional()
  @IsString()
  licenseNumber?: string;
} 