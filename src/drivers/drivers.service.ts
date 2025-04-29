import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from '../entities/driver.entity';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { DriverStatus } from './enums/driver-status.enum';

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Driver)
    private driversRepository: Repository<Driver>,
  ) {}

  async create(createDriverDto: CreateDriverDto): Promise<Driver> {
    const driver = this.driversRepository.create(createDriverDto);
    return await this.driversRepository.save(driver);
  }

  async findAll(): Promise<Driver[]> {
    return await this.driversRepository.find();
  }

  async findOne(id: string): Promise<Driver> {
    const driver = await this.driversRepository.findOne({ where: { id } });
    if (!driver) {
      throw new NotFoundException(`Driver with ID ${id} not found`);
    }
    return driver;
  }

  async update(id: string, updateDriverDto: UpdateDriverDto): Promise<Driver> {
    const driver = await this.findOne(id);
    Object.assign(driver, updateDriverDto);
    return await this.driversRepository.save(driver);
  }

  async updateStatus(id: string, status: DriverStatus): Promise<Driver> {
    const driver = await this.findOne(id);
    driver.status = status;
    return await this.driversRepository.save(driver);
  }

  async updateLocation(
    id: string,
    latitude: number,
    longitude: number,
  ): Promise<Driver> {
    const driver = await this.findOne(id);
    driver.currentLatitude = latitude;
    driver.currentLongitude = longitude;
    return await this.driversRepository.save(driver);
  }

  async findAvailableDrivers(): Promise<Driver[]> {
    return await this.driversRepository.find({
      where: { status: DriverStatus.AVAILABLE },
    });
  }

  async remove(id: number): Promise<void> {
    const result = await this.driversRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Driver with ID ${id} not found`);
    }
  }
} 