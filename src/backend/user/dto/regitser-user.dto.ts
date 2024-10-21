import { IsEmail, IsNotEmpty } from "class-validator";

export class RegitserUserDto{

    @IsNotEmpty({
        message: '用户名不能为空'
    })
    user_name: string;

    @IsNotEmpty({
        message: '密码不能为空'
    })
    password: string;
    
    @IsNotEmpty({
        message: '邮箱不能为空'
    })
    @IsEmail({}, {
        message: '邮箱格式不正确'
    })
    email: string;

    @IsNotEmpty({
        message: '验证码不能为空'
    })
    captcha: string;
}