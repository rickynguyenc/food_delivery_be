import { IsNumber, IsString, IsEnum, IsOptional, Min, Max } from 'class-validator';
import { ReviewStatus } from '../enums/review-status.enum';

export class CreateReviewDto {
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  comment: string;

  @IsNumber()
  userId: number;

  @IsNumber()
  restaurantId: number;

  @IsNumber()
  orderId: number;

  @IsOptional()
  @IsEnum(ReviewStatus)
  status?: ReviewStatus;

  @IsOptional()
  @IsString()
  reply?: string;
} 