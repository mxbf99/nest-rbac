import { ApiProperty } from '@nestjs/swagger';

export class ListResponseDto<T> {
  @ApiProperty({ description: '列表', default: [] })
  list: T[] = [];
  @ApiProperty({ description: '总数' })
  total: number;
  @ApiProperty({ description: '总页数' })
  total_page: number;
}
