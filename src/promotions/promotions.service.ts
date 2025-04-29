import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Promotion } from '../entities/promotion.entity';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { PromotionType } from './enums/promotion-type.enum';

@Injectable()
export class PromotionsService {
  constructor(
    @InjectRepository(Promotion)
    private promotionsRepository: Repository<Promotion>,
  ) {}

  async create(createPromotionDto: CreatePromotionDto): Promise<Promotion> {
    // Validate dates
    if (createPromotionDto.startDate >= createPromotionDto.endDate) {
      throw new BadRequestException('End date must be after start date');
    }

    const promotion = this.promotionsRepository.create(createPromotionDto);
    return await this.promotionsRepository.save(promotion);
  }

  async findAll(): Promise<Promotion[]> {
    return await this.promotionsRepository.find({
      relations: ['restaurant'],
    });
  }

  async findOne(id: string): Promise<Promotion> {
    const promotion = await this.promotionsRepository.findOne({
      where: { id },
      relations: ['restaurant'],
    });

    if (!promotion) {
      throw new NotFoundException(`Promotion with ID ${id} not found`);
    }

    return promotion;
  }

  async findByCode(code: string): Promise<Promotion> {
    const promotion = await this.promotionsRepository.findOne({
      where: { code },
      relations: ['restaurant'],
    });

    if (!promotion) {
      throw new NotFoundException(`Promotion with code ${code} not found`);
    }

    return promotion;
  }

  async findActive(): Promise<Promotion[]> {
    const now = new Date();
    return await this.promotionsRepository.find({
      where: {
        startDate: LessThanOrEqual(now),
        endDate: MoreThanOrEqual(now),
      },
      relations: ['restaurant'],
    });
  }

  async findByRestaurant(restaurantId: string): Promise<Promotion[]> {
    return await this.promotionsRepository.find({
      where: { restaurant: { id: restaurantId } },
      relations: ['restaurant'],
    });
  }

  async update(id: string, updatePromotionDto: UpdatePromotionDto): Promise<Promotion> {
    const promotion = await this.findOne(id);
    Object.assign(promotion, updatePromotionDto);
    return await this.promotionsRepository.save(promotion);
  }

  async validatePromotion(code: string, orderAmount: number): Promise<{ valid: boolean; discount: number }> {
    const promotion = await this.findByCode(code);
    const now = new Date();

    if (now < promotion.startDate || now > promotion.endDate) {
      return { valid: false, discount: 0 };
    }

    if (promotion.minimumOrderAmount && orderAmount < promotion.minimumOrderAmount) {
      return { valid: false, discount: 0 };
    }

    let discount = 0;
    if (promotion.type === PromotionType.PERCENTAGE) {
      discount = (orderAmount * promotion.discountValue) / 100;
    } else if (promotion.type === PromotionType.FIXED_AMOUNT) {
      discount = promotion.discountValue;
    } else if (promotion.type === PromotionType.FREE_DELIVERY) {
      // Handle free delivery logic
      discount = 0; // This would be the delivery fee
    }

    return { valid: true, discount };
  }

  async remove(id: string): Promise<void> {
    const result = await this.promotionsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Promotion with ID ${id} not found`);
    }
  }
} 