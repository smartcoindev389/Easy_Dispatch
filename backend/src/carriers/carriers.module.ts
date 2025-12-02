import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { CarriersService } from './carriers.service';
import { FrenetAdapter } from './adapters/frenet.adapter';
import { CircuitBreakerService } from './circuit-breaker.service';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [CarriersService, FrenetAdapter, CircuitBreakerService],
  exports: [CarriersService],
})
export class CarriersModule {}

