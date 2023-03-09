import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateRoleDto } from './dtos/create-role.dto';
import { RoleService } from './role.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateRoleDto } from './dtos/update-role.dto';
import { QueryRoleDto } from './dtos/query-role.dto';
import { CheckPermission } from 'src/decorators/permission.decorator';

@ApiTags('角色管理')
@Controller('system/role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({ summary: '新增角色' })
  @CheckPermission('system:role:create')
  @Post()
  createRole(@Body() role: CreateRoleDto) {
    return this.roleService.create(role);
  }

  @ApiOperation({ summary: '修改角色' })
  @CheckPermission('system:role:update')
  @Put(':id')
  updateRole(@Param() params: { id: number }, @Body() role: UpdateRoleDto) {
    return this.roleService.update(params.id, role);
  }

  @ApiOperation({ summary: '删除角色' })
  @CheckPermission('system:role:delete')
  @Delete(':id')
  removeRole(@Param() params: { id: number }) {
    return this.roleService.remove(params.id);
  }

  @ApiOperation({ summary: '角色列表' })
  // @CheckPermission('system:role:list')
  @Get()
  getRoleList(@Query() query: QueryRoleDto) {
    return this.roleService.findAll(query);
  }

  @ApiOperation({ summary: '角色详情' })
  @CheckPermission('system:role:detail')
  @Get('detail/:id')
  getRoleById(@Param() params: { id: number }) {
    return this.roleService.findById(params.id);
  }
}
