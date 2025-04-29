import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuItem } from '../entities/menu-item.entity';

@Injectable()
export class MenuItemsService {
  constructor(
    @InjectRepository(MenuItem)
    private menuItemsRepository: Repository<MenuItem>,
  ) {}

  async create(menuItem: Partial<MenuItem>): Promise<MenuItem> {
    return await this.menuItemsRepository.save(menuItem);
  }

  async findAll(): Promise<MenuItem[]> {
    return await this.menuItemsRepository.find({
      relations: ['restaurant'],
    });
  }

  async findOne(id: number): Promise<MenuItem> {
    const menuItem = await this.menuItemsRepository.findOne({
      where: { id },
      relations: ['restaurant'],
    });

    if (!menuItem) {
      throw new NotFoundException(`Menu item with ID ${id} not found`);
    }

    return menuItem;
  }

  async update(id: number, menuItem: Partial<MenuItem>): Promise<MenuItem> {
    await this.findOne(id);
    await this.menuItemsRepository.update(id, menuItem);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.menuItemsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Menu item with ID ${id} not found`);
    }
  }
} 