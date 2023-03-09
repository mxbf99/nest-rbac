import { Inject, Injectable } from '@nestjs/common';
import { RedisClient } from './redis.providers';

@Injectable()
export class RedisService {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redisClient: RedisClient,
  ) {}

  // 获取缓存
  async get(key: string): Promise<string | object> {
    const value = await this.redisClient.get(key);
    if (typeof value === 'object') {
      return JSON.parse(value);
    }
    return value;
  }

  // 设置缓存
  async set(
    key: string,
    value: string | object,
    seconds?: number,
  ): Promise<string> {
    const newValue = typeof value === 'object' ? JSON.stringify(value) : value;
    if (seconds) {
      return await this.redisClient.set(key, newValue, 'EX', seconds);
    }
    return await this.redisClient.set(key, newValue);
  }

  // 删除缓存
  async del(key: string): Promise<number> {
    return await this.redisClient.del(key);
  }

  // 清空缓存
  async flushall(): Promise<string> {
    return await this.redisClient.flushall();
  }

  // 判断缓存是否存在
  async exists(key: string): Promise<number> {
    return await this.redisClient.exists(key);
  }

  // 重新给缓存设置时间
  async expire(key: string, seconds: number): Promise<number> {
    return await this.redisClient.expire(key, seconds);
  }

  // 获取缓存的剩余时间
  async ttl(key: string): Promise<number> {
    return await this.redisClient.ttl(key);
  }
}
