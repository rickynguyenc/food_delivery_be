import { IsString, MinLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  currentPassword: string;

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