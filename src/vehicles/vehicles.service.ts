import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './vehicle.entity';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
  ) {}

  findAll(): Promise<Vehicle[]> {
    return this.vehicleRepository.find();
  }

  findOne(id: number): Promise<Vehicle | null> {
    return this.vehicleRepository.findOne({ where: { id } });
  }

  async create(data: Omit<Vehicle, 'id' | 'createdAt'>): Promise<Vehicle> {
    console.log('Iniciando guardado en base de datos');
    console.log('Datos a guardar:', data);
    const result = await this.vehicleRepository.save(data);
    console.log('Vehículo guardado exitosamente:', result);
    return result;
  }

  async update(id: number, data: Partial<Vehicle>): Promise<Vehicle> {
    await this.vehicleRepository.update(id, data);
    return this.findOne(id);
  }

  async delete(id: number): Promise<Vehicle> {
    console.log('Iniciando eliminación de vehículo en base de datos');
    const vehicle = await this.findOne(id);
    await this.vehicleRepository.delete(id);
    console.log('Vehículo eliminado exitosamente:', vehicle);
    return vehicle; //quiero des fragmetar el vehicle y  
  }
}