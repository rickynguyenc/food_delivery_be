import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReviewStatus } from './enums/review-status.enum';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new review' })
  @ApiResponse({ status: 201, description: 'The review has been successfully created.' })
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all reviews' })
  @ApiResponse({ status: 200, description: 'Return all reviews.' })
  findAll() {
    return this.reviewsService.findAll();
  }

  @Get('restaurant/:restaurantId')
  @ApiOperation({ summary: 'Get reviews by restaurant' })
  @ApiResponse({ status: 200, description: 'Return reviews for the specified restaurant.' })
  findByRestaurant(@Param('restaurantId', ParseIntPipe) restaurantId: string) {
    return this.reviewsService.findByRestaurant(restaurantId);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get reviews by user' })
  @ApiResponse({ status: 200, description: 'Return reviews by the specified user.' })
  findByUser(@Param('userId', ParseIntPipe) userId: string) {
    return this.reviewsService.findByUser(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a review by id' })
  @ApiResponse({ status: 200, description: 'Return the review.' })
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.reviewsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a review' })
  @ApiResponse({ status: 200, description: 'The review has been successfully updated.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return this.reviewsService.update(id, updateReviewDto);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update review status' })
  @ApiResponse({ status: 200, description: 'The review status has been successfully updated.' })
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: ReviewStatus,
  ) {
    return this.reviewsService.updateStatus(id, status);
  }

  @Patch(':id/reply')
  @ApiOperation({ summary: 'Add a reply to a review' })
  @ApiResponse({ status: 200, description: 'The reply has been successfully added.' })
  addReply(
    @Param('id', ParseIntPipe) id: number,
    @Body('reply') reply: string,
  ) {
    return this.reviewsService.addReply(id, reply);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a review' })
  @ApiResponse({ status: 200, description: 'The review has been successfully deleted.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.reviewsService.remove(id);
  }
} 