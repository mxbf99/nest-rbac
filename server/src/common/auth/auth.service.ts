import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { UserService } from 'src/modules/system/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { encrypt } from 'src/utils/encrypt';
import { RedisService } from '../redis/redis.service';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(account: LoginDto) {
    const user = await this.userService.findOne([
      { username: account.account },
      { email: account.account },
      { phone: account.account },
    ]);
    if (!user) throw new NotFoundException('用户不存在');

    const { password, salt } = user;
    if (password !== encrypt(account.password, salt))
      throw new NotAcceptableException('密码错误');

    const uuid = uuidv4();
    const payload = {
      sub: user.id,
      uuid,
    };
    const token = this.jwtService.sign(payload);

    await this.redisService.set(
      uuid,
      token,
      this.configService.get('jwt.expires'),
    );
    return token;
  }

  async logout(uuid: string) {
    await this.redisService.del(uuid);
    return '退出成功';
  }
}
