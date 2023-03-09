import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

export class ListQueryDto {
  @ApiProperty({ description: '页码', default: 1, required: false })
  @Allow()
  page?: number = 1;
  @ApiProperty({ description: '每页数量', default: 20, required: false })
  @Allow()
  page_size?: number = 20;
  @ApiProperty({ description: '关键字', required: false })
  @Allow()
  keyword?: string;
}
