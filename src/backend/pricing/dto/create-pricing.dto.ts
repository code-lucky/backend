import { IsNotEmpty } from "class-validator";

export class CreatePricingDto {
    @IsNotEmpty({
        message: 'Name is required'
    })
    name: string;

    @IsNotEmpty({
        message: 'Original price is required'
    })
    original_price: number;
    
    @IsNotEmpty({
        message: 'Price is required'
    })
    price: number;

    @IsNotEmpty({
        message: 'Discount is required'
    })
    discount: number;
    
    sort: number;
}
