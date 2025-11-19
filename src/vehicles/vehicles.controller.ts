import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { Vehicle } from '@prisma/client';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get()
  findAll(): Promise<Vehicle[]> {
    return this.vehiclesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Vehicle> {
    return this.vehiclesService.findOne(Number(id));
  }

  @Post()
  create(@Body() data: Omit<Vehicle, 'id' | 'createdAt'>): Promise<Vehicle> {
    return this.vehiclesService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Vehicle>): Promise<Vehicle> {
    return this.vehiclesService.update(Number(id), data);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Vehicle> {
    return this.vehiclesService.delete(Number(id));
  }
}
