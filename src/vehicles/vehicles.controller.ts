import { Controller, Get, Post, Body, Param, Put, Delete, Patch } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { vehicles } from './vehicle.entity';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get()
  findAll(): Promise<vehicles[]> {
    return this.vehiclesService.findAll();
      // falta poner try catch para capturar el error, ya que si no hay datos devuelve un array vacio
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<vehicles> {
    return this.vehiclesService.findOne(Number(id));
  }

  @Post()
  create(@Body() data: Omit<vehicles, 'id' | 'createdAt'>): Promise<vehicles> {
    console.log('[Controller] Datos recibidos:', data);
    return this.vehiclesService.create(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Partial<vehicles>): Promise<vehicles> {
    return this.vehiclesService.update(Number(id), data);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<vehicles> {
    return this.vehiclesService.delete(Number(id));
  }
}
