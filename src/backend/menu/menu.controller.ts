import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Request } from '@nestjs/common';
import { MenuService } from './menu.service';
import { RequireLogin } from 'src/decorator/custom.decorator';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Controller('menu')
@RequireLogin()
export class MenuController {
  
  @Inject(MenuService)
  private menuService: MenuService;

  @Get('menuList')
  async getMenuList(@Request() req) {
    return this.menuService.menuList(req.user.userId);
  }

  @Post('createMenu')
  async createMenu(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.createMenu(createMenuDto);
  }

  @Post('updateMenu')
  async updateMenu(@Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.modifMenu(updateMenuDto);
  }

  @Get('treeMenu')
  async treeMenu() {
    return this.menuService.treeMenu();
  }

  @Get('getMenuByTop')
  async getMenuByTop() {
    return this.menuService.getMenuListByTop();
  }

  @Post('deleteMenu/:id')
  async deleteMenu(@Param('id') id: string) {
    return this.menuService.deleteMenu(id);
  }

  @Get('getMenu/:id')
  async getMenu(@Param('id') id: number) {
    return this.menuService.getMenu(id);
  }
}
