import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from '../../entitys/menu.entity';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { User } from '../../entitys/user.entity';

@Injectable()
export class MenuService {

  @InjectRepository(Menu)
  private menuRepository: Repository<Menu>;

  @InjectRepository(User)
  private userRepository: Repository<User>;
  /**
   * 
   * @returns 获取菜单列表
   */
  async menuList(user_id: number) {
    try {
      // 根据用户id获取角色id，然后获取角色关联的menu
      const list = await this.userRepository.createQueryBuilder('user')
        .innerJoin('user.role', 'role')
        .innerJoin('role.roleData', 'roleData')
        .innerJoin('roleData.menu', 'menu')
        .select([
          'menu.id AS id',
          'menu.menu_name AS menu_name',
          'menu.pid AS pid',
          'menu.menu_path AS menu_path',
          'menu.menu_component AS menu_component',
          'menu.menu_icon AS menu_icon',
          'menu.hide AS hide',
          'menu.sort AS sort',
          'menu.create_time AS create_time',
        ])
        .where('user.id = :id', { id: user_id }).
        getRawMany();
      return list;
    } catch (e) {
      throw new HttpException('获取菜单列表失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  /**
   * 
   * @param menuDto 创建菜单的dto
   * @returns 
   */
  async createMenu(menuDto: CreateMenuDto) {
    const menu = new Menu();
    menu.menu_name = menuDto.menu_name;
    menu.pid = menuDto.pid;
    menu.menu_path = menuDto.menu_path;
    menu.menu_component = menuDto.menu_component;
    menu.menu_icon = menuDto.menu_icon;
    menu.sort = menuDto.sort;

    try {
      await this.menuRepository.save(menu);
      return '创建菜单成功';
    } catch (e) {
      throw new HttpException('创建菜单失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * 
   * @param menuDto 更新菜单的dto
   * @returns 
   */
  async modifMenu(menuDto: UpdateMenuDto) {
    const menu = new Menu();
    menu.id = menuDto.id;
    menu.menu_name = menuDto.menu_name;
    menu.pid = menuDto.pid;
    menu.menu_path = menuDto.menu_path;
    menu.menu_component = menuDto.menu_component;
    menu.menu_icon = menuDto.menu_icon;
    menu.sort = menuDto.sort;
    menu.hide = menuDto.hide;

    try {
      await this.menuRepository.update(menuDto.id, menu);
      return '修改菜单成功';
    } catch (e) {
      throw new HttpException('修改菜单失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  /**
   * 
   * @returns 获取菜单树
   */
  async treeMenu() {
    try {
      const menuList = await this.menuRepository.findBy({ is_delete: 0 })
      const tree = this.toTree(menuList, 0);
      return tree;
    } catch (e) {
      throw new HttpException('获取菜单树失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * 格式化成树型菜单
   * @param data 菜单列表
   * @param pid 父ID
   * @returns 
   */
  toTree(data: Menu[], pid: number) {
    const result = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].pid === pid) {
        const children = this.toTree(data, data[i].id);
        if (children.length > 0) {
          data[i].children = children;
        }
        result.push(data[i]);
      }
    }
    return result;
  }

  /**
   * 获取第一级菜单
   */
  getMenuListByTop() {
    return this.menuRepository.createQueryBuilder().where('pid = 0 and is_delete = 0').getMany();
  }


  /**
   * 
   * @param id 菜单ID
   * @returns 
   */
  async deleteMenu(id: string) {
    try {
      await this.menuRepository.update(id, { is_delete: 1 });
      return '删除菜单成功';
    } catch (e) {
      throw new HttpException('删除菜单失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  /**
   * 
   * @param id 菜单ID
   * @returns 
   */
  async getMenu(id: number) {
    try {
      const menu = await this.menuRepository.findOneBy({ id: id, is_delete: 0 });
      return menu;
    } catch (e) {
      throw new HttpException('获取菜单失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
