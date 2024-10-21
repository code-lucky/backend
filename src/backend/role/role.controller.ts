import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RequireLogin } from 'src/decorator/custom.decorator';

@RequireLogin()
@Controller('role')
export class RoleController {
  
  @Inject(RoleService)
  private roleService: RoleService;

  @Get('roleList')
  async getRoleList() {
    return this.roleService.roleList();
  }

  @Post('create')
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.createRole(createRoleDto);
  }

  @Post('update/:id')
  async updateRole(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.updateRole(id, updateRoleDto);
  }

  @Get('detail/:id')
  async getRoleDetail(@Param('id') id: number) {
    return this.roleService.roleDetail(id);
  }
}
