import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from '../entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewStatus } from './enums/review-status.enum';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const review = this.reviewsRepository.create({
      ...createReviewDto,
      status: ReviewStatus.PENDING,
    });
    return await this.reviewsRepository.save(review);
  }

  async findAll(): Promise<Review[]> {
    return await this.reviewsRepository.find({
      relations: ['user', 'restaurant', 'order'],
    });
  }

  async findOne(id: string): Promise<Review> {
    const review = await this.reviewsRepository.findOne({
      where: { id },
      relations: ['user', 'restaurant', 'order'],
    });

    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }

    return review;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto): Promise<Review> {
    const review = await this.findOne(id.toString());
    Object.assign(review, updateReviewDto);
    return await this.reviewsRepository.save(review);
  }

  async updateStatus(id: number, status: ReviewStatus): Promise<Review> {
    const review = await this.findOne(id.toString());
    review.status = status;
    return await this.reviewsRepository.save(review);
  }

  async addReply(id: number, reply: string): Promise<Review> {
    const review = await this.findOne(id.toString());
    review.reply = reply;
    return await this.reviewsRepository.save(review);
  }

  async findByRestaurant(restaurantId: string): Promise<Review[]> {
    return await this.reviewsRepository.find({
      where: { restaurant: { id: restaurantId } },
      relations: ['user', 'restaurant', 'order'],
    });
  }

  async findByUser(userId: string): Promise<Review[]> {
    return await this.reviewsRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'restaurant', 'order'],
    });
  }

  async remove(id: number): Promise<void> {
    const result = await this.reviewsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
  }
} 