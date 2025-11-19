import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Vehicle } from '@prisma/client';

@Injectable()
export class VehiclesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Vehicle[]> {
    return this.prisma.vehicle.findMany();
  }

  findOne(id: number): Promise<Vehicle | null> {
    return this.prisma.vehicle.findUnique({ where: { id } });
  }

  create(data: Omit<Vehicle, 'id' | 'createdAt'>): Promise<Vehicle> {
    return this.prisma.vehicle.create({ data });
  }

  update(id: number, data: Partial<Vehicle>): Promise<Vehicle> {
    return this.prisma.vehicle.update({ where: { id }, data });
  }

  delete(id: number): Promise<Vehicle> {
    return this.prisma.vehicle.delete({ where: { id } });
  }
}
