import { Module } from '@nestjs/common';
import { RoleModule } from './role/role.module';
import { MenuModule } from './menu/menu.module';
import { LogModule } from './log/log.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [RoleModule, MenuModule, LogModule, UserModule],
  providers: [LogModule],
  exports: [LogModule],
})
export class SystemModule {}
