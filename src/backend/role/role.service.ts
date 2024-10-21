import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { In, Repository } from 'typeorm';
import { Role } from '../../entitys/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleData } from '../../entitys/role-data.entity';

@Injectable()
export class RoleService {
  
  @InjectRepository(Role)
  private roleRepository: Repository<Role>;

  @InjectRepository(RoleData)
  private roleDataRepository: Repository<RoleData>;
  /**
   * 
   * @returns 获取角色列表
   */
  async roleList() {

    const roleList = this.roleRepository
    .createQueryBuilder()
    .select([
      'role.id AS id',
      'role.role_name AS role_name',
      'role.create_time AS create_time',
      'role.update_time AS update_time',
    ])
    .where('role.is_delete = 0')
    .getRawMany();

    return roleList;
  }


  /**
   * 
   * @param createRoleDto 创建角色
   * @returns 
   */
  async createRole(createRoleDto: CreateRoleDto) {
    const { role_name, menu_ids } = createRoleDto;
    const queryRunner = this.roleRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 第一步保存到role表
      const role = new Role();
      role.role_name = role_name;
      const roleData = await queryRunner.manager.save(Role, role);

      // 第二步保存到role_data表, 插入多条数据到role_data表
      const roleDataList = menu_ids.map(menu_id => ({
        roleId: roleData.id,
        menuId: menu_id,
      }));

      // 批量插入
      await queryRunner.manager.insert(RoleData, roleDataList);

      await queryRunner.commitTransaction();

      return '创建角色成功';
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(`创建角色失败: ${e.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * 更新角色
   * @param id 
   * @param updateRoleDto 
   * @returns 
   */
  async updateRole(id: number, updateRoleDto: UpdateRoleDto) {
    const queryRunner = this.roleRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 第一步删除role_data表中的数据
      await queryRunner.manager.delete(RoleData, { roleId: id });

      // 第二步更新role表中的数据
      await queryRunner.manager.update(Role, { id }, { role_name: updateRoleDto.role_name });

      // 第三步插入role_data表中的数据
      const roleDataList = updateRoleDto.menu_ids.map(menu_id => ({
        roleId: id,
        menuId: menu_id,
      }));

      // 批量插入
      await queryRunner.manager.insert(RoleData, roleDataList);

      await queryRunner.commitTransaction();

      return '更新角色成功';
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(`更新角色失败: ${e.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * 获取角色详情
   * @param id 
   */
  async roleDetail(id: number) {
    try{
      // 进行多表联查，获取角色详情role关联role_data
      const roleDetail = await this.roleRepository.
        createQueryBuilder('role').
        leftJoinAndSelect('role.roleData', 'role-data').
        select([
          'role.id AS id',
          'role.role_name AS role_name',
          'GROUP_CONCAT(role-data.menuId) AS menu_ids'
        ]).
        where('role.id = :id', {id}).
        groupBy('role.id').
        getRawOne();

        const result = {
          ...roleDetail,
          menu_ids: roleDetail.menu_ids ? roleDetail.menu_ids.split(',').map(Number) : []
        }
        return result;
    }catch(e){
      throw new HttpException('获取角色详情失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }
}
