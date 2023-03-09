import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { SystemModule } from './modules/system/system.module';

@Module({
  imports: [CommonModule, SystemModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
