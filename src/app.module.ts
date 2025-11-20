import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiclesModule } from './vehicles/vehicles.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        const databaseUrl = process.env.DATABASE_URL;
        if (databaseUrl) {
          // Use full DATABASE_URL (e.g. postgres://user:pass@host:5432/db)
          return {
            type: 'postgres',
            url: databaseUrl,
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
            logging: false,
            autoLoadEntities: true,
          } as any;
        }

        // Fallback to individual POSTGRES_* env vars
        return {
          type: 'postgres',
          host: process.env.POSTGRES_HOST || 'localhost',
          port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
          username: process.env.POSTGRES_USER || 'postgres',
          password: process.env.POSTGRES_PASSWORD || 'postgres',
          database: process.env.POSTGRES_DB || 'nest',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
          logging: false,
          autoLoadEntities: true,
        } as any;
      },
    }),
    AuthModule,
    UsersModule,
    VehiclesModule
  ]
})
export class AppModule {
  constructor() {
    console.log('🚀 Aplicación inicializada');
  }
}
