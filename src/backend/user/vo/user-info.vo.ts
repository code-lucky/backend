import { ApiProperty } from "@nestjs/swagger";


export class UserInfo {
    @ApiProperty()
    id: number;

    @ApiProperty()
    user_name: string;

    @ApiProperty()
    head_pic: string;

    @ApiProperty()
    role_name: string;

    @ApiProperty()
    create_time: Date;
}