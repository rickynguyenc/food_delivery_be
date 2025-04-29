import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getDatabaseConfig } from '../config/database.config';
import { User } from '../entities/user.entity';
import { Restaurant } from '../entities/restaurant.entity';
import { MenuItem } from '../entities/menu-item.entity';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { Driver } from '../entities/driver.entity';
import { DriverOrder } from '../entities/driver-order.entity';
import { Review } from '../entities/review.entity';
import { Promotion } from '../entities/promotion.entity';
import { UserAddress } from '../entities/user-address.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getDatabaseConfig,
    }),
    TypeOrmModule.forFeature([
      User,
      Restaurant,
      MenuItem,
      Order,
      OrderItem,
      Driver,
      DriverOrder,
      Review,
      Promotion,
      UserAddress,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {} 