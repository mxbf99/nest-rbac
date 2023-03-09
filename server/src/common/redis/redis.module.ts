import { Global, Module } from '@nestjs/common';
import { redisProviders } from './redis.providers';
import { RedisService } from './redis.service';

@Global()
@Module({
  providers: [...redisProviders, RedisService],
  exports: [RedisService],
})
export class RedisModule {}
