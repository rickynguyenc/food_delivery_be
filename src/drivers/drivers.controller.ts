import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DriverStatus } from './enums/driver-status.enum';

@ApiTags('drivers')
@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new driver' })
  @ApiResponse({ status: 201, description: 'The driver has been successfully created.' })
  create(@Body() createDriverDto: CreateDriverDto) {
    return this.driversService.create(createDriverDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all drivers' })
  @ApiResponse({ status: 200, description: 'Return all drivers.' })
  findAll() {
    return this.driversService.findAll();
  }

  @Get('available')
  @ApiOperation({ summary: 'Get all available drivers' })
  @ApiResponse({ status: 200, description: 'Return all available drivers.' })
  findAvailable() {
    return this.driversService.findAvailableDrivers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a driver by id' })
  @ApiResponse({ status: 200, description: 'Return the driver.' })
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.driversService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a driver' })
  @ApiResponse({ status: 200, description: 'The driver has been successfully updated.' })
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateDriverDto: UpdateDriverDto,
  ) {
    return this.driversService.update(id, updateDriverDto);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update driver status' })
  @ApiResponse({ status: 200, description: 'The driver status has been successfully updated.' })
  updateStatus(
    @Param('id', ParseIntPipe) id: string,
    @Body('status') status: DriverStatus,
  ) {
    return this.driversService.updateStatus(id, status);
  }

  @Patch(':id/location')
  @ApiOperation({ summary: 'Update driver location' })
  @ApiResponse({ status: 200, description: 'The driver location has been successfully updated.' })
  updateLocation(
    @Param('id', ParseIntPipe) id: string,
    @Body('latitude') latitude: number,
    @Body('longitude') longitude: number,
  ) {
    return this.driversService.updateLocation(id, latitude, longitude);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a driver' })
  @ApiResponse({ status: 200, description: 'The driver has been successfully deleted.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.driversService.remove(id);
  }
} 