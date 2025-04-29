import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MenuItemsService } from './menu-items.service';
import { MenuItem } from '../entities/menu-item.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('menu-items')
@Controller('menu-items')
export class MenuItemsController {
  constructor(private readonly menuItemsService: MenuItemsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new menu item' })
  @ApiResponse({ status: 201, description: 'The menu item has been successfully created.' })
  create(@Body() menuItem: Partial<MenuItem>) {
    return this.menuItemsService.create(menuItem);
  }

  @Get()
  @ApiOperation({ summary: 'Get all menu items' })
  @ApiResponse({ status: 200, description: 'Return all menu items.' })
  findAll() {
    return this.menuItemsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a menu item by id' })
  @ApiResponse({ status: 200, description: 'Return the menu item.' })
  findOne(@Param('id') id: string) {
    return this.menuItemsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a menu item' })
  @ApiResponse({ status: 200, description: 'The menu item has been successfully updated.' })
  update(@Param('id') id: string, @Body() menuItem: Partial<MenuItem>) {
    return this.menuItemsService.update(+id, menuItem);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a menu item' })
  @ApiResponse({ status: 200, description: 'The menu item has been successfully deleted.' })
  remove(@Param('id') id: string) {
    return this.menuItemsService.remove(+id);
  }
} 