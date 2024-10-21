import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { Role } from '../../entitys/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleData } from '../../entitys/role-data.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, RoleData]),
  ],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
