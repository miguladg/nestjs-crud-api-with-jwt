import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { vehicles } from './vehicle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([vehicles])],
  controllers: [VehiclesController],
  providers: [VehiclesService],
})
export class VehiclesModule {}
