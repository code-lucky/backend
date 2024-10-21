import { IsEmail, IsNotEmpty } from "class-validator";

export class changeEmailDto{

    @IsNotEmpty({
        message: '旧邮箱不能为空'
    })
    @IsEmail({}, {
        message: '邮箱格式不正确'
    })
    current_email: string;
    
    @IsNotEmpty({
        message: '邮箱不能为空',
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