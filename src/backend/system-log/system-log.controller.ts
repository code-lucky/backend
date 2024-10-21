import { Controller, Get, Post, Body, Patch, Param, Delete, DefaultValuePipe, ParseIntPipe, Query } from '@nestjs/common';
import { SystemLogService } from './system-log.service';
import { RequireLogin } from 'src/decorator/custom.decorator';

@RequireLogin()
@Controller('systemLog')
export class SystemLogController {
  constructor(private readonly systemLogService: SystemLogService) { }

  /**
   * 获取系统日志列表
   * @param page 
   * @param pageSize 
   * @returns 
   */
  @Get('list')
  async getList(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
  ) {
    return await this.systemLogService.getList(page, pageSize);
  }
}
