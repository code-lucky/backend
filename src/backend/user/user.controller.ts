import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, HttpStatus, Query, Req, HttpException, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { EmailService } from 'src/email/email.service';
import { RedisService } from 'src/redis/redis.service';
import { RequireLogin } from 'src/decorator/custom.decorator';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { query, Request } from 'express';
import { UpdatePasswordDto } from './dto/update_paddword.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { changeEmailDto } from './dto/change-email.dto';
import { RegitserUserDto } from './dto/regitser-user.dto';

@Controller('user')
export class UserController {
  @Inject(UserService)
  private userService: UserService;

  @Inject(JwtService)
  private jwtService: JwtService;

  @Inject(ConfigService)
  private configService: ConfigService;

  @Inject(EmailService)
  private emailService: EmailService;

  @Inject(RedisService)
  private redisService: RedisService;

  /**
   * 登录
   * @param user 
   * @returns 
   */
  @Post('login')
  async userLogin(@Body() user: LoginDto) {
    const vo = await this.userService.login(user)
    vo.access_token = this.jwtService.sign({
      userId: vo.userInfo.id,
      username: vo.userInfo.user_name
    }, {
      expiresIn: this.configService.get('jwt_access_token_expires_time') || '30m'
    })

    vo.refresh_token = this.jwtService.sign({
      userId: vo.userInfo.id
    }, {
      expiresIn: this.configService.get('jwt_refresh_token_expres_time') || '7d'
    });
    return vo;
  }

  /**
   * 
   * @param user userDto
   * @returns 
   */
  @RequireLogin()
  @Post('addUser')
  async addUser(@Body() user: CreateUserDto) {
    return await this.userService.createUser(user);
  }

  /**
   * 
   * @param req 获取token中的用户id
   * @returns 
   */
  @RequireLogin()
  @Get('userInfo')
  async getUserInfo(@Req() req: Request) {
    return await this.userService.getUserInfo(req.user.userId);
  }

  /**
   * 
   * @param updatePasswordDto 更新密码dto
   * @param req 获取token中的用户id
   * @returns 
   */
  @RequireLogin()
  @Post('updatePassword')
  async updatePassword(@Body() updatePasswordDto: UpdatePasswordDto, @Req() req: Request) {
    return await this.userService.updatePassword(req.user.userId, updatePasswordDto);
  }

  /**
   * 更新用户信息
   * @param req 获取token中的用户id
   * @param user 更新用户dto
   * @returns 
   */
  @RequireLogin()
  @Post('updateUser')
  async updateUser(@Req() req: Request, @Body() user: UpdateUserDto) {
    return await this.userService.modifyUser(req.user.userId, user);
  }

  /**
   * 修改邮箱
   * @param emailObj 修改邮箱的dto
   * @param req 请求token
   * @returns 
   */
  @Post('updateEmail')
  @RequireLogin()
  async changeEmail(@Body() emailObj: changeEmailDto, @Req() req: Request) {
    return await this.userService.changeEmail(emailObj, req.user.userId);
  }

  /**
   * 更新邮箱验证码
   * @param email 新邮箱
   * @param req 请求token
   * @returns 
   */
  @Get('updateEmailSendCode')
  @RequireLogin()
  async changeEmailSendCode(@Query('email') email: string, @Req() req: Request) {
    return await this.userService.sendEmailCode(email, req.user.userId);
  }

  /**
   * 注册发送验证码
   * @param email 邮箱
   * @returns 
   */
  @Get('registerCode')
  async sendRegisterCode(@Query('email') email: string) {
    return await this.userService.sendRegisterCode(email);
  }

  /**
   * 用户注册
   * @param user 
   * @returns 
   */
  @Post('register')
  async regiterUser(@Body() user: RegitserUserDto) {
    return await this.userService.register(user);
  }

  /**
   * 忘记密码发送验证码
   * @param email 邮箱
   * @returns 
   */
  @Get('resetPasswordCode')
  async sendForgotPasswordCode(@Query('email') email: string) {
    return await this.userService.sendForgotPasswordCode(email);
  }

  /**
   * 重置密码
   * @param email 邮箱
   * @param captcha 验证码
   * @returns 
   */
  @Post('resetPassword')
  async resetPassword(@Query('email') email: string, @Query('captcha') captcha: string) {
    return await this.userService.resetPassword(email, captcha);
  }


  /**
   * 获取用户列表
   * @param page 
   * @param pageSize 
   * @returns 
   */
  @RequireLogin()
  @Get('userList')
  async getUserList(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe) pageSize: number
  ) {
    return await this.userService.getUserList(page, pageSize);
  }

  @RequireLogin()
  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @RequireLogin()
  @Post('update/:id')
  async updateUserById(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUserById(id, updateUserDto);
  }

  @RequireLogin()
  @Delete('delete/:id')
  async deleteUserById(@Param('id') id: number) {
    return this.userService.deleteUserById(id);
  }

  @RequireLogin()
  @Post('auth/:id')
  async userAuth(@Param('id') id: number, @Query('role_id') role_id: number) {
    return this.userService.userAuth(id, role_id);
  }
}
