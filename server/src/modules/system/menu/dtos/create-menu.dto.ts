import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsNotEmpty } from 'class-validator';

export class CreateMenuDto {
  @ApiProperty({ description: '菜单名称' })
  @IsNotEmpty({ message: '菜单名称不能为空' })
  name: string;

  @ApiProperty({ description: '菜单地址', required: false })
  @Allow()
  path: string;

  @ApiProperty({ description: '菜单组件路径', required: false })
  @Allow()
  component: string;

  @ApiProperty({ description: '菜单图标', required: false })
  @Allow()
  icon: string;

  @ApiProperty({ description: '菜单权限标识', required: false })
  @Allow()
  permission: string;

  @ApiProperty({ description: '菜单重定向', required: false })
  @Allow()
  redirect: string;

  @ApiProperty({
    description: '菜单类型(1:目录;2:菜单;3:按钮/资源)',
  })
  @IsNotEmpty({ message: '菜单类型不能为空' })
  type: number;

  @ApiProperty({ description: '是否外链(0:否;1:是)', required: true })
  @IsNotEmpty({ message: '是否外链不能为空' })
  link: number;

  @ApiProperty({ description: '是否隐藏(0:否;1:是)', required: true })
  @IsNotEmpty({ message: '是否隐藏不能为空' })
  hidden: number;

  @ApiProperty({ description: '是否缓存', required: true })
  @IsNotEmpty({ message: '是否缓存不能为空' })
  cache: number;

  @ApiProperty({ description: '菜单状态(0:禁用;1:启用)', required: true })
  @IsNotEmpty({ message: '菜单状态不能为空' })
  status: number;

  @ApiProperty({ description: '菜单排序', required: false })
  @IsNotEmpty({ message: '菜单排序不能为空' })
  sort: number;

  @ApiProperty({ description: '父级菜单id', required: false })
  @Allow()
  parent_id: number;
}
