import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entities/system/role.entity';
import { In, Repository } from 'typeorm';
import { CreateRoleDto } from './dtos/create-role.dto';
import { Menu } from 'src/entities/system/menu.entity';
import { UpdateRoleDto } from './dtos/update-role.dto';
import { QueryRoleDto } from './dtos/query-role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @InjectRepository(Menu) private readonly menuRepository: Repository<Menu>,
  ) {}

  async create(role: CreateRoleDto) {
    const newRole = new Role(role);
    const menus = await this.menuRepository.findBy({
      id: In(role.menu_ids),
    });
    newRole.menus = menus;
    await this.roleRepository.save(newRole);
    return '新增成功';
  }

  async update(id: number, role: UpdateRoleDto) {
    const tempRole = await this.roleRepository.findOneBy({ id });
    const menus = await this.menuRepository.findBy({
      id: In(role.menu_ids),
    });
    tempRole.menus = menus;
    await this.roleRepository.merge(tempRole, role);
    await this.roleRepository.save(tempRole);
    return '修改成功';
  }

  async remove(id: number) {
    const role = await this.roleRepository.findOneBy({ id });
    await this.roleRepository.remove(role);
    return '删除成功';
  }

  async findAll(query: QueryRoleDto) {
    const sqlBuilder = this.roleRepository.createQueryBuilder('role');

    if (query.name) {
      sqlBuilder.andWhere('role.name like :name', {
        name: `%${query.name}%`,
      });
    }
    if (query.status) {
      sqlBuilder.andWhere('role.status = :status', {
        status: query.status,
      });
    }

    return await sqlBuilder
      .leftJoinAndSelect('role.menus', 'menus')
      .select(['role', 'menus.id'])
      .getMany();
  }

  async findById(id: number) {
    const role = await this.roleRepository.findOneBy({ id });
    if (!role) throw new NotFoundException('角色不存在');
    return role;
  }
}
