import { IsNotEmpty } from "class-validator";

export class LoginDto{
    
    @IsNotEmpty({
        message: '密码不能为空'
    })
    password: string;

    @IsNotEmpty({
        message: '邮箱不能为空'
    })
    user_name: string;
}