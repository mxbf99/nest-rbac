import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Role } from './role.entity';

@Entity({ name: 'sys_menu' })
export class Menu {
  constructor(partial: Partial<Menu>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '菜单名称' })
  name: string;

  @Column({ comment: '前端路由', nullable: true })
  path: string;

  @Column({ comment: '前端组件', nullable: true })
  component: string;

  @Column({ comment: '菜单图标', nullable: true })
  icon: string;

  @Column({ comment: '权限标识', nullable: true })
  permission: string;

  @Column({ comment: '重定向', nullable: true })
  redirect: string;

  @Column({ comment: '0:目录 1:菜单 2:按钮 ' })
  type: number;

  @Column({ comment: '是否外链接 0:否 1:是', default: 0 })
  link: number;

  @Column({ comment: '是否隐藏 0:否 1:是', default: 0 })
  hidden: number;

  @Column({ comment: '是否缓存 0:否 1:是', default: 0 })
  cache: number;

  @Column({ comment: '菜单状态 0:禁用 1:启用', default: 1 })
  status: number;

  @Column({ comment: '排序', default: 0 })
  sort: number;

  @Column({ nullable: true })
  parent_id: number;

  @ManyToMany(() => Role, (role) => role.menus)
  roles: Role[];

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  created_by: User;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
