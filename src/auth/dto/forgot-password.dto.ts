import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class ResetPasswordDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty({ description: 'New password must be at least 8 characters' })
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  newPassword: string;

  @ApiProperty({ description: 'Must match new password' })
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  confirmNewPassword: string;
} 