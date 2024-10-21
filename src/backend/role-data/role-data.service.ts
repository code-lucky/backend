import { Injectable } from '@nestjs/common';
import { CreateRoleDatumDto } from './dto/create-role-datum.dto';
import { UpdateRoleDatumDto } from './dto/update-role-datum.dto';

@Injectable()
export class RoleDataService {
  create(createRoleDatumDto: CreateRoleDatumDto) {
    return 'This action adds a new roleDatum';
  }

  findAll() {
    return `This action returns all roleData`;
  }

  findOne(id: number) {
    return `This action returns a #${id} roleDatum`;
  }

  update(id: number, updateRoleDatumDto: UpdateRoleDatumDto) {
    return `This action updates a #${id} roleDatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} roleDatum`;
  }
}
