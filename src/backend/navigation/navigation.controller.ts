import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NavigationService } from './navigation.service';
import { CreateNavigationDto } from './dto/create-navigation.dto';
import { UpdateNavigationDto } from './dto/update-navigation.dto';
import axios from 'axios';

@Controller('navigation')
export class NavigationController {
  constructor(private readonly navigationService: NavigationService) { }

  @Get('list')
  async getList() {
    return await this.navigationService.getList();
  }

  @Get('detail/:id')
  async findOne(@Param('id') id: string) {
    return await this.navigationService.getNavigationById(+id);
  }

  @Post('create')
  async create(@Body() createNavigationDto: CreateNavigationDto) {
    return await this.navigationService.createNavigation(createNavigationDto);
  }

  @Post('update')
  async update(@Body() updateNavigationDto: UpdateNavigationDto) {
    return await this.navigationService.updateNavigation(updateNavigationDto);
  }

  @Post('delete/:id')
  async remove(@Param('id') id: string) {
    return await this.navigationService.delNavigation(+id);
  }


  @Get('test')
  async test() {
    // 帮我写一个获取第三方接口的函数
    const res = await axios.get('http://api.jutuike.com/Meituan/act?apikey=nxGcqI37m4J7uCM3dJE9XqZzcOiKx4fP&type=1&sid=123456');
    if(res.data.code === 1) {
      return res.data.data;
    } else {
      return res.data.msg;
    }
  }
}
