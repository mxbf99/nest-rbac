import { Global, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from 'src/config/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonController } from './common.controller';
import { resolve } from 'path';
import { RedisModule } from './redis/redis.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get('mysql.host'),
          port: configService.get('mysql.port'),
          username: configService.get('mysql.username'),
          password: configService.get('mysql.password'),
          database: configService.get('mysql.database'),
          synchronize: configService.get('mysql.synchronize'),
          entities: [resolve('dist') + '/**/*.entity{.ts,.js}'],
          autoLoadEntities: true,
          logging: false,
        };
      },
      inject: [ConfigService],
    }),
    RedisModule,
    AuthModule,
  ],
  providers: [],
  exports: [],
  controllers: [CommonController],
})
export class CommonModule {}
