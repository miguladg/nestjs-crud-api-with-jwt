import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { VehiclesModule } from './vehicles/vehicles.module';

@Module({
  imports: [
    TaskModule,
    VehiclesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
