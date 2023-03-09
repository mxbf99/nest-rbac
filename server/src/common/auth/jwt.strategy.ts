import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, NotFoundException, SetMetadata } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '../redis/redis.service';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/modules/system/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    protected readonly reflector: Reflector,
    protected readonly configService: ConfigService,
    protected readonly redisService: RedisService,
    protected readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get('jwt.secret'),
    });
  }

  async validate(payload: any) {
    // 判断token是否存在
    const is_has = await this.redisService.exists(payload.uuid);
    if (!is_has) return null;

    // 获取token时间
    const token_expire = await this.redisService.ttl(payload.uuid);

    // 如果token过期时间小于等于0，删除token，返回null
    if (token_expire <= 0) {
      await this.redisService.del(payload.uuid);
      return null;
    } else if (token_expire <= this.configService.get('jwt.expires') / 2) {
      // 如果token过期时间小于等于设置时间的一半，重新设置token过期时间
      await this.redisService.expire(
        payload.uuid,
        this.configService.get('jwt.expires'),
      );
    }

    const user = await this.userService.findById(payload.sub);
    if (!user) return null;

    SetMetadata('user_id', payload.sub);

    return {
      user_id: payload.sub,
      uuid: payload.uuid,
    };
  }
}
