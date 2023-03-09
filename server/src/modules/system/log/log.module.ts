import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WinstonModule, WinstonModuleOptions, utilities } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

@Module({
  imports: [
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const consoleTransport = new winston.transports.Console({
          level: configService.get('logger.level'),
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.simple(),
            utilities.format.nestLike(),
          ),
        });

        const infoFileTransport = new winston.transports.DailyRotateFile({
          filename: 'logs/info-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          level: 'info',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
        });

        const errFileTransport = new winston.transports.DailyRotateFile({
          filename: 'logs/error-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          level: 'error',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
        });

        return {
          transports: [
            consoleTransport,
            ...(configService.get('logger.file.enable')
              ? [infoFileTransport, errFileTransport]
              : []),
          ],
        } as WinstonModuleOptions;
      },
    }),
  ],
})
export class LogModule {}
