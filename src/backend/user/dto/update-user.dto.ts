import { IsNotEmpty } from "class-validator";

export class UpdateUserDto{

    @IsNotEmpty({
        message: '用户名不能为空'
    })
    user_name: string;
    
    head_pic: string;
}