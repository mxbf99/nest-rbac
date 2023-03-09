import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dtos/create-menu.dto';
import { UpdateMenuDto } from './dtos/update-menu.dto';
import { QueryMenuDto } from './dtos/query-menu.dto';
import { JwtGuard } from 'src/guards/jwt.guard';
import { PermissionGuard } from 'src/guards/permission.guard';
import { UserService } from '../user/user.service';
import { CheckPermission } from 'src/decorators/permission.decorator';

@ApiTags('菜单管理')
@Controller('system/menu')
@UseGuards(JwtGuard, PermissionGuard)
export class MenuController {
  constructor(
    private readonly menuService: MenuService,
    private readonly userService: UserService,
  ) {}

  @ApiOperation({ summary: '添加菜单' })
  @CheckPermission('system:menu:create')
  @Post()
  createMenu(@Body() menu: CreateMenuDto) {
    this.menuService.create(menu);
    return '添加成功';
  }

  @ApiOperation({ summary: '修改菜单' })
  @CheckPermission('system:menu:update')
  @Put(':id')
  updateMenu(@Param() params: { id: number }, @Body() menu: UpdateMenuDto) {
    return this.menuService.update(params.id, menu);
  }

  @ApiOperation({ summary: '删除菜单' })
  @CheckPermission('system:menu:delete')
  @Delete(':id')
  removeMenu(@Param() params: { id: number }) {
    return this.menuService.remove(params.id);
  }

  @ApiOperation({ summary: '菜单列表' })
  // @CheckPermission('system:menu:list')
  @Get()
  getMenuList(@Query() query: QueryMenuDto) {
    return this.menuService.findAll(query);
  }

  @ApiOperation({ summary: '菜单详情' })
  @CheckPermission('system:menu:detail')
  @Get('detail/:id')
  getMenuById(@Param() params: { id: number }) {
    return this.menuService.findById(params.id);
  }

  @ApiOperation({ summary: '获取当前用户的菜单权限' })
  @Get('routes')
  async getRoutes(@Request() req) {
    const role_ids = await this.userService.findUserRoleIds(req.user.user_id);
    return this.menuService.findRoutes(role_ids);
  }

  @ApiOperation({ summary: '获取当前用户的接口权限' })
  @Get('permissions')
  async getPermissions(@Request() req) {
    const role_ids = await this.userService.findUserRoleIds(req.user.user_id);
    return this.menuService.findPermissions(role_ids);
  }
}
