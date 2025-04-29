import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Order } from './order.entity';
import { Review } from './review.entity';
import { UserAddress } from './user-address.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true, length: 100 })
  email: string;

  @Column({ length: 100 })
  password: string;

  @Column({ length: 20, nullable: true })
  phone: string;

  @Column({ default: 'user' })
  role: string;

  @OneToMany(() => Order, order => order.user)
  orders: Order[];

  @OneToMany(() => Review, review => review.user)
  reviews: Review[];

  @OneToMany(() => UserAddress, address => address.user)
  addresses: UserAddress[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  resetToken: string;

  @Column({ type: 'timestamp', nullable: true })
  resetTokenExpiry: Date;
} 