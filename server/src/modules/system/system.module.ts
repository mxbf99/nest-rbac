import { Module } from '@nestjs/common';
import { RoleModule } from './role/role.module';
import { MenuModule } from './menu/menu.module';
import { LogModule } from './log/log.module';
import { UserModule } from './user/user.module';
import { DepModule } from './dep/dep.module';

@Module({
  imports: [RoleModule, MenuModule, LogModule, UserModule, DepModule],
  providers: [LogModule],
  exports: [LogModule],
})
export class SystemModule {}
