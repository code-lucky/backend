import { PartialType } from '@nestjs/swagger';
import { CreateNavigationDto } from './create-navigation.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateNavigationDto extends PartialType(CreateNavigationDto) {
    @IsNotEmpty({
        message: 'ID cannot be empty'
    })
    id: number;
}
