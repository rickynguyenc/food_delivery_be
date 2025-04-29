import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Driver } from './driver.entity';
import { Order } from './order.entity';

export enum DriverOrderStatus {
  ASSIGNED = 'assigned',
  PICKED_UP = 'picked_up',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}

@Entity('driver_orders')
export class DriverOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: DriverOrderStatus, default: DriverOrderStatus.ASSIGNED })
  status: DriverOrderStatus;

  @ManyToOne(() => Driver, driver => driver.driverOrders)
  driver: Driver;

  @ManyToOne(() => Order, order => order.driverOrders)
  order: Order;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 