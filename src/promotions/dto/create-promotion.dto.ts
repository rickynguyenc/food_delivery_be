import { IsString, IsEnum, IsNumber, IsOptional, IsDate, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { PromotionType } from '../enums/promotion-type.enum';

export class CreatePromotionDto {
  @IsString()
  code: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsEnum(PromotionType)
  type: PromotionType;

  @IsNumber()
  @Min(0)
  @Max(100)
  discountValue: number;

  @IsNumber()
  @Min(0)
  minimumOrderAmount: number;

  @IsNumber()
  @Min(1)
  maxUses: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  usesPerUser?: number;

  @Type(() => Date)
  @IsDate()
  startDate: Date;

  @Type(() => Date)
  @IsDate()
  endDate: Date;

  @IsOptional()
  @IsNumber()
  restaurantId?: number;

  @IsOptional()
  @IsString()
  imageUrl?: string;
} 