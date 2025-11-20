import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { vehicles } from './vehicle.entity';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(vehicles)
    private vehicleRepository: Repository<vehicles>,
  ) {}

  findAll(): Promise<vehicles[]> {
    return this.vehicleRepository.find();
  }

  findOne(id: number): Promise<vehicles | null> {
    return this.vehicleRepository.findOne({ where: { id } });
  }

  async create(data: Omit<vehicles, 'id' | 'createdAt'>): Promise<vehicles> {
    console.log('Iniciando guardado en base de datos');
    console.log('Datos a guardar:', data);
    const result = await this.vehicleRepository.save(data);
    console.log('Vehículo guardado exitosamente:', result);
    return result;
  }

  async update(id: number, data: Partial<vehicles>): Promise<vehicles> {
    await this.vehicleRepository.update(id, data);
    return this.findOne(id);
  }

  async delete(id: number): Promise<vehicles> {
    console.log('Iniciando eliminación de vehículo en base de datos');
    const vehicle = await this.findOne(id);
    await this.vehicleRepository.delete(id);
    console.log('Vehículo eliminado exitosamente:', vehicle);
    return vehicle; //quiero des fragmetar el vehicle y  
  }
}