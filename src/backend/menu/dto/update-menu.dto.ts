import { CreateMenuDto } from './create-menu.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateMenuDto extends CreateMenuDto {
    
    @IsNotEmpty({
        message: '菜单id不能为空'
    })
    id: number;
}
