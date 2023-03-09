import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Menu } from './menu.entity';

@Entity({ name: 'sys_role' })
export class Role {
  constructor(partial: Partial<Role>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '角色名称', unique: true })
  name: string;

  @Column({ comment: '角色标识', unique: true })
  tag: string;

  @Column({ comment: '排序', default: 0 })
  sort: number;

  @Column({ comment: '角色状态 0:禁用 1:启用', default: 1 })
  status: number;

  @Column({ comment: '备注', nullable: true })
  desc: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];

  @ManyToMany(() => Menu, (menu) => menu.roles)
  @JoinTable({
    name: 'sys_role_menu',
    joinColumn: { name: 'role_id' },
    inverseJoinColumn: { name: 'menu_id' },
  })
  menus: Menu[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
