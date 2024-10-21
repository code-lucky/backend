import { Module } from '@nestjs/common';
import { PricingService } from './pricing.service';
import { PricingController } from './pricing.controller';
import { Pricing } from '../../entitys/pricing.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pricing]),
  ],
  controllers: [PricingController],
  providers: [PricingService],
})
export class PricingModule {}
