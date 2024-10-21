import { ApiProperty } from "@nestjs/swagger";


class UserInfo{
  @ApiProperty()
  id: number;
  
  @ApiProperty()
  user_name: string;

  @ApiProperty()
  head_pic: string;

  @ApiProperty()
  create_time: Date;
}


export class LoginUserVo {

    @ApiProperty()
    userInfo: UserInfo;

    @ApiProperty()
    access_token: string;

    @ApiProperty()
    refresh_token: string;
    vo: { id: number; };
}