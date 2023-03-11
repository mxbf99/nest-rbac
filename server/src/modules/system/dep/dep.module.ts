import { Module } from '@nestjs/common';
import { DepController } from './dep.controller';
import { DepService } from './dep.service';

@Module({
  controllers: [DepController],
  providers: [DepService]
})
export class DepModule {}
