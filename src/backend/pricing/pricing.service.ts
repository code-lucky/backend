import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePricingDto } from './dto/create-pricing.dto';
import { UpdatePricingDto } from './dto/update-pricing.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pricing } from '../../entitys/pricing.entity';
import { Repository } from 'typeorm';
import { Http } from 'winston/lib/winston/transports';

@Injectable()
export class PricingService {

  @InjectRepository(Pricing)
  private pricingRepository: Repository<Pricing>;

  /**
   * Get Pricing List
   * @returns 
   */
  async getList() {
    try {
      return await this.pricingRepository.find({
        order: {
          sort: 'ASC'
        },
        where: {
          is_delete: 0
        }
      });
    } catch (e) {
      throw new HttpException('Get Pricing List Failed', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  /**
   * Create Pricing
   * @param createPricingDto 
   * @returns 
   */
  async create(createPricingDto: CreatePricingDto) {
    try {
      const pricing = new Pricing();
      pricing.name = createPricingDto.name;
      pricing.original_price = createPricingDto.original_price;
      pricing.price = createPricingDto.price;
      pricing.discount = createPricingDto.discount;
      pricing.sort = createPricingDto.sort;
      await this.pricingRepository.save(pricing);
      return 'Create Success';
    } catch (e) {
      throw new HttpException('Create Pricing Failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Update Pricing
   * @param updatePricingDto
   * @returns
   * 
   */
  async update(updatePricingDto: UpdatePricingDto) {
    try {
      const data = await this.pricingRepository.findOne({ where: { id: updatePricingDto.id, is_delete: 0 } });
      if (!data) {
        throw new HttpException('Pricing Not Found', HttpStatus.BAD_REQUEST);
      }
      await this.pricingRepository.update(updatePricingDto.id, updatePricingDto);
      return 'Update Success';
    } catch (e) {
      throw new HttpException('Update Pricing Failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Remove Pricing
   * @param id 
   * @returns 
   */
  async remove(id: number) {
    try {
      const data = await this.pricingRepository.findOne({ where: { id, is_delete: 0 } });
      if (!data) {
        throw new HttpException('Data not found', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      return await this.pricingRepository.update(id, { is_delete: 1 });
    } catch (e) {
      throw new HttpException('Delete Pricing Failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Get Pricing Detail
   * @param id 
   * @returns 
   */
  async detail(id: number) {
    try {
      const data = await this.pricingRepository.findOne({ where: { id, is_delete: 0 } });
      if (!data) {
        throw new HttpException('Data not found', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      return data
    } catch (e) {
      throw new HttpException('Get Pricing Detail Failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
