import { ApiOkResponse, ApiProperty } from '@nestjs/swagger';

export class ResponseData {
  @ApiProperty({ description: '状态码', default: 200 })
  code: number;
  @ApiProperty({ description: '消息', default: 'success' })
  msg: string;
  @ApiProperty({ description: '数据', default: null })
  data: any;
}
