import { IsNotEmpty } from "class-validator";

export class CreateMenuDto {

    @IsNotEmpty({
        message: '菜单名称不能为空'
    })
    menu_name: string;

    pid: number;

    @IsNotEmpty({
        message: '菜单路径不能为空'
    })
    menu_path: string;

    menu_component: string;

    menu_icon: string;

    @IsNotEmpty({
        message: 'Hide Not Null'
    })
    hide: number;

    @IsNotEmpty({
        message: '排序不能为空'
    })
    sort: number;
}
