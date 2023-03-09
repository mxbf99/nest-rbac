import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { MenuService } from 'src/modules/system/menu/menu.service';
import { UserService } from 'src/modules/system/user/user.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService,
    private readonly menuService: MenuService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const permission = this.reflector.get<string>(
      'permission',
      context.getHandler(),
    );
    if (!permission) return true;

    const user_id = this.reflector.get<number>('user_id', context.getHandler());
    const roles = await this.userService.findUserRoleIds(user_id);
    const permissions = await this.menuService.findPermissions(roles);
    if (permissions.includes(permission)) return true;
    return false;
  }
}
