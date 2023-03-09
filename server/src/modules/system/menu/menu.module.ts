import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from 'src/entities/system/menu.entity';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Menu])],
  providers: [MenuService],
  controllers: [MenuController],
  exports: [MenuService],
})
export class MenuModule {}
