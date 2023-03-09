import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { ConfigService } from '@nestjs/config';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import helmet from 'helmet';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import { AllExceptionFilter } from 'src/filters/all-exception.filter';
import { ResponseInterceptor } from './interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false,
    cors: true,
  });
  const configService = app.get(ConfigService);

  // 全局使用json
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  // 全局使用日志
  const loggerEnable = configService.get('logger.enable');
  loggerEnable && app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  // 全局使用前缀
  app.setGlobalPrefix('api');

  // 全局使用过滤器
  const logger = new Logger();
  app.useGlobalFilters(new AllExceptionFilter(logger));

  // 全局使用管道
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  // 全局使用拦截器
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // 全局使用安全头
  app.use(helmet());

  // 全局使用swagger
  if (configService.get('swagger.enable')) {
    const options = new DocumentBuilder()
      .setTitle(configService.get('swagger.title'))
      .addBearerAuth()
      .setDescription(configService.get('swagger.description'))
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api/swagger', app, document);
  }

  const port = configService.get('application.port');
  await app.listen(port);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
