import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, Point } from 'typeorm';
import { User } from './user.entity';

@Entity('user_addresses')
export class UserAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 200 })
  address: string;

  @Column({ type: 'point' })
  location: Point;

  @Column({ length: 100, nullable: true })
  label: string;

  @Column({ default: false })
  isDefault: boolean;

  @ManyToOne(() => User, user => user.addresses)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 