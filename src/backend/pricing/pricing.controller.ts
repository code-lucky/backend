import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PricingService } from './pricing.service';
import { CreatePricingDto } from './dto/create-pricing.dto';
import { UpdatePricingDto } from './dto/update-pricing.dto';

@Controller('pricing')
export class PricingController {
  constructor(private readonly pricingService: PricingService) {}

  @Get('list')
  async getList() {
    return await this.pricingService.getList();
  }


  @Post('create')
  async create(@Body() createPricingDto: CreatePricingDto) {
    return await this.pricingService.create(createPricingDto);
  }

  @Post('update')
  async update(@Body() updatePricingDto: UpdatePricingDto) {
    return await this.pricingService.update(updatePricingDto);
  }

  @Post('delete/:id')
  async remove(@Param('id') id: string) {
    return await this.pricingService.remove(+id);
  }

  @Get('detail/:id')
  async detail(@Param('id') id: string) {
    return await this.pricingService.detail(+id);
  }
}
