import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from 'src/entities/system/menu.entity';
import { In, IsNull, Not, Repository } from 'typeorm';
import { CreateMenuDto } from './dtos/create-menu.dto';
import { UpdateMenuDto } from './dtos/update-menu.dto';
import { QueryMenuDto } from './dtos/query-menu.dto';
import { UserService } from '../user/user.service';
import { changeTree, menuToRoutes } from 'src/utils/change-tree';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu) private readonly menuRepository: Repository<Menu>,
  ) {}

  async create(menu: CreateMenuDto) {
    const parent = await this.menuRepository.findOneBy({ id: menu.parent_id });
    const newMenu = new Menu(menu);
    parent && (newMenu.parent_id = menu.parent_id);
    if (menu.type === 0) {
      newMenu.component = 'Layout';
    }
    return await this.menuRepository.save(newMenu);
  }

  async update(id: number, menu: UpdateMenuDto) {
    const parent = await this.menuRepository.findOneBy({ id: menu.parent_id });
    if (!parent) {
      delete menu.parent_id;
    }
    await this.menuRepository.update(id, menu);
    return '修改成功';
  }

  async remove(id: number) {
    const menu = await this.menuRepository.findOneBy({ id });
    await this.menuRepository.remove(menu);
    return '删除成功';
  }

  async findAll(query: QueryMenuDto) {
    const menus = await this.menuRepository
      .createQueryBuilder('menu')
      .orderBy('menu.sort', 'ASC')
      .skip((query.page - 1) * query.page_size)
      .take(query.page_size)
      .getMany();
    const menuTree = changeTree(menus, null);
    return menuTree;
  }

  async findById(id: number) {
    return await this.menuRepository.findOneBy({ id });
  }

  async findRoutes(role_ids: number[]) {
    const menus = await this.menuRepository
      .createQueryBuilder('menu')
      .leftJoinAndSelect('menu.roles', 'role')
      .andWhere('role.id IN (:...role_ids)', { role_ids })
      .andWhere('menu.type != :type', { type: 3 })
      .andWhere('menu.status = :status', { status: 1 })
      .select('menu')
      .orderBy('menu.sort', 'ASC')
      .getMany();
    console.log(role_ids);

    const menuTree = menuToRoutes(menus, null);
    return menuTree;
  }

  async findPermissions(role_ids: number[]) {
    const permissions = await this.menuRepository
      .createQueryBuilder('menu')
      .leftJoinAndSelect('menu.roles', 'role')
      .andWhere('menu.permission != :permission', { permission: '' })
      .andWhere('role.id IN (:...role_ids)', { role_ids })
      .select('menu.permission')
      .getMany();

    return permissions.map((permission) => permission.permission);
  }
}
