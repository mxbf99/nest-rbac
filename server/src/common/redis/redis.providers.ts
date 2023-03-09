import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

export type RedisClient = Redis;

export const redisProviders: Provider[] = [
  {
    useFactory: (configService: ConfigService): RedisClient => {
      return new Redis({
        host: configService.get('redis.host'),
        port: configService.get('redis.port'),
        password: configService.get('redis.password'),
      });
    },
    inject: [ConfigService],
    provide: 'REDIS_CLIENT',
  },
];
