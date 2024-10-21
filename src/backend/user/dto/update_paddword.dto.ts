import { IsNotEmpty } from "class-validator";

export class UpdatePasswordDto{

    @IsNotEmpty({
        message: '原密码不能为空'
    })
    old_password: string;

    @IsNotEmpty({
        message: '新密码不能为空'
    })
    password: string;

    @IsNotEmpty({
        message: '确认密码不能为空'
    })
    confirm_password: string;
}