import { IsNotEmpty } from "class-validator";

export class CreateRoleDto {
    @IsNotEmpty({
        message: '角色名称不能为空'
    })
    role_name: string;

    @IsNotEmpty({
        message: '菜单不能为空'
    })
    menu_ids: number[];
}
