import { Global, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from 'src/entities/system/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/entities/system/role.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
