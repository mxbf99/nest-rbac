import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';
import { ListResponseDto } from 'src/dtos/list-response.dto';
import { ResponseData } from 'src/dtos/response.dto';

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();
    return next.handle().pipe(
      map((data) => {
        const responseData = new ResponseData();
        responseData.code = response.statusCode;
        responseData.msg = 'success';
        if (data instanceof ListResponseDto) {
          responseData.data = {
            list: plainToInstance(this.dto, data.list, {
              excludeExtraneousValues: true,
            }),
            total: data.total,
            total_page: data.total_page,
          };
        } else {
          responseData.data = plainToInstance(this.dto, data, {
            excludeExtraneousValues: true,
          });
        }

        response.status(response.statusCode);
        return responseData;
      }),
    );
  }
}
