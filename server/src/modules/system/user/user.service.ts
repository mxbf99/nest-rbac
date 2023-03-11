import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/system/user.entity';
import { In, Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { QueryUserDto } from './dtos/query-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { generateSalt, encrypt } from 'src/utils/encrypt';
import { Role } from 'src/entities/system/role.entity';
import { ListResponseDto } from 'src/dtos/list-response.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async create(user: CreateUserDto) {
    const { username, email, phone } = user;
    const accountArray = [username, email, phone];
    const isHave = await this.userRepository.findOne({
      where: [
        { username: In(accountArray) },
        { email: In(accountArray) },
        { phone: In(accountArray) },
      ],
    });
    if (isHave) {
      throw new BadRequestException('用户已存在');
    }
    const newUser = new User(user);
    const roles = await this.roleRepository.find({
      where: { id: In(user.role_ids) },
    });
    newUser.salt = generateSalt();
    newUser.password = encrypt(user.password, newUser.salt);
    newUser.roles = roles;
    await this.userRepository.save(newUser);
    return '新增成功';
  }

  async remove(id: number) {
    await this.userRepository.softDelete(id);
    return '删除成功';
  }

  async update(id: number, user: UpdateUserDto) {
    const tempUser = await this.userRepository.findOneBy({ id });
    const roles = await this.roleRepository.find({
      where: { id: In(user.role_ids) },
    });
    tempUser.roles = roles;
    await this.userRepository.merge(tempUser, user);
    await this.userRepository.save(tempUser);
    return '修改成功';
  }

  async findAll(query: QueryUserDto) {
    const data = new ListResponseDto();
    const sqlBuilder = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'roles')
      .select(['user', 'roles.id', 'roles.name']);

    query.username &&
      sqlBuilder.andWhere('user.username like :username', {
        username: `%${query.username}%`,
      });
    query.phone &&
      sqlBuilder.andWhere('user.phone like :phone', {
        phone: `%${query.phone}%`,
      });
    query.email &&
      sqlBuilder.andWhere('user.email like :email', {
        email: `%${query.email}%`,
      });
    query.status &&
      sqlBuilder.andWhere('user.status = :status', { status: query.status });

    data.list = await sqlBuilder
      .skip((query.page - 1) * query.page_size)
      .take(query.page_size)
      .getMany();
    data.total = await sqlBuilder.getCount();
    data.total_page = Math.ceil(data.total / query.page_size);
    return data;
  }

  async findById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  async findOne(where: any) {
    return await this.userRepository.findOne({
      where,
      relations: ['roles'],
      select: ['roles'],
    });
  }

  async findUserRoleIds(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['roles'],
    });
    return user.roles.map((role) => role.id);
  }

  async getInfo(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['roles'],
    });

    return user;
  }
}
