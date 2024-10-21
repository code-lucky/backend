import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleDataService } from './role-data.service';
import { CreateRoleDatumDto } from './dto/create-role-datum.dto';
import { UpdateRoleDatumDto } from './dto/update-role-datum.dto';

@Controller('role-data')
export class RoleDataController {
  constructor(private readonly roleDataService: RoleDataService) {}

  @Post()
  create(@Body() createRoleDatumDto: CreateRoleDatumDto) {
    return this.roleDataService.create(createRoleDatumDto);
  }

  @Get()
  findAll() {
    return this.roleDataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleDataService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDatumDto: UpdateRoleDatumDto) {
    return this.roleDataService.update(+id, updateRoleDatumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleDataService.remove(+id);
  }
}
