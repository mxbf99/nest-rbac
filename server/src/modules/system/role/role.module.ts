import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/entities/system/role.entity';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { Menu } from 'src/entities/system/menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Menu])],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
