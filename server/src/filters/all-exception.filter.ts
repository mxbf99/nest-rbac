import {
  ExceptionFilter,
  HttpException,
  HttpStatus,
  LoggerService,
} from '@nestjs/common';
import { ArgumentsHost, Catch } from '@nestjs/common';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}
  catch(exception: unknown, host: ArgumentsHost) {
    console.log('exception', exception);
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const messageIsArray = exception['response']?.message instanceof Array;
    const msg =
      (messageIsArray && exception['response']['message'][0]) ||
      exception['response']?.message ||
      exception['message'] ||
      '未知错误';
    const log = {
      headers: request.headers,
      method: request.method,
      query: request.query,
      body: request.body,
      params: request.params,
      timestamp: new Date().toISOString(),
      exceptioin: exception,
      msg,
    };

    this.logger.error(log);
    response.status(httpStatus).json({
      code: httpStatus,
      msg: msg,
      timestamp: new Date().toISOString(),
    });
    return;
  }
}
