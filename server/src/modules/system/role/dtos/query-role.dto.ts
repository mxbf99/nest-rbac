import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { ListQueryDto } from 'src/dtos/list-query.dto';

export class QueryRoleDto extends ListQueryDto {
  @ApiProperty({
    description: '角色名称',
    required: false,
  })
  @Allow()
  name?: string;

  @ApiProperty({
    description: '状态',
    required: false,
  })
  @Allow()
  status?: number;
}
