import { PartialType } from '@nestjs/swagger';
import { CreatePricingDto } from './create-pricing.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdatePricingDto extends PartialType(CreatePricingDto) {
    @IsNotEmpty({
        message: 'Id is required'
    })
    id: number;
}
