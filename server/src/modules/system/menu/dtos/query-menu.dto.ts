import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { ListQueryDto } from 'src/dtos/list-query.dto';

export class QueryMenuDto extends ListQueryDto {
  @ApiProperty({ description: '菜单名称', required: false })
  @Allow()
  name?: string;

  @ApiProperty({ description: '菜单状态', required: false })
  @Allow()
  status?: number;
}
