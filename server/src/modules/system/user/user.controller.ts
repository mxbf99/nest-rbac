import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { QueryUserDto } from './dtos/query-user.dto';
import { PermissionGuard } from 'src/guards/permission.guard';
import { CheckPermission, NotAuth } from 'src/decorators/permission.decorator';
import { JwtGuard } from 'src/guards/jwt.guard';

@ApiTags('用户管理')
@Controller('system/user')
@UseGuards(JwtGuard, PermissionGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @ApiOperation({ summary: '新增用户' })
  @CheckPermission('system:user:create')
  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }

  @ApiOperation({ summary: '修改用户' })
  @CheckPermission('system:user:update')
  @Put(':id')
  updateUser(@Param() params: { id: number }, @Body() user: UpdateUserDto) {
    return this.userService.update(params.id, user);
  }

  @ApiOperation({ summary: '删除用户' })
  @CheckPermission('system:user:delete')
  @Delete(':id')
  removeUser(@Param() params: { id: number }) {
    return this.userService.remove(params.id);
  }

  @ApiOperation({ summary: '用户列表' })
  // @CheckPermission('system:user:list')
  @Get()
  @NotAuth()
  getUserList(@Query() query: QueryUserDto) {
    return this.userService.findAll(query);
  }

  @ApiOperation({ summary: '用户详情' })
  @CheckPermission('system:user:detail')
  @Get('detail/:id')
  getUserById(@Param() params: { id: number }) {
    return this.userService.findById(params.id);
  }
}
