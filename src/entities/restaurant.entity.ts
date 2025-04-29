import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, Point } from 'typeorm';
import { MenuItem } from './menu-item.entity';
import { Review } from './review.entity';
import { Order } from './order.entity';

@Entity('restaurants')
export class Restaurant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 500 })
  description: string;

  @Column({ type: 'point' })
  location: Point;

  @Column({ length: 100 })
  address: string;

  @Column({ length: 20 })
  phone: string;

  @Column({ length: 100 })
  email: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  rating: number;

  @OneToMany(() => MenuItem, menuItem => menuItem.restaurant)
  menuItems: MenuItem[];

  @OneToMany(() => Review, review => review.restaurant)
  reviews: Review[];

  @OneToMany(() => Order, order => order.restaurant)
  orders: Order[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 