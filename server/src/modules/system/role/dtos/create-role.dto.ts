import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ description: '角色名称', example: '超级管理员' })
  @IsNotEmpty({ message: '角色名称不能为空' })
  name: string;

  @ApiProperty({ description: '角色标识', example: 'admin' })
  @IsNotEmpty({ message: '角色标识不能为空' })
  tag: string;

  @ApiProperty({ description: '角色描述', example: '管理员' })
  @Allow()
  desc: string;

  @ApiProperty({ description: '排序', example: 1 })
  @Allow()
  sort?: number = 0;

  @ApiProperty({ description: '角色状态 0:禁用 1:启用', example: 1 })
  @IsNotEmpty({ message: '角色状态不能为空' })
  status: number;

  @ApiProperty({ description: '菜单ID列表', example: [1, 2, 3] })
  @Allow()
  menu_ids: number[];
}
