import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { ListQueryDto } from 'src/dtos/list-query.dto';

export class QueryUserDto extends ListQueryDto {
  @ApiProperty({
    description: '用户名',
    example: 'testuser',
    required: false,
  })
  @Allow()
  username: string;

  @ApiProperty({
    description: '手机号',
    example: '188888888',
    required: false,
  })
  @Allow()
  phone: string;

  @ApiProperty({
    description: '邮箱',
    example: 'testemail@example.com',
    required: false,
  })
  @Allow()
  email: string;

  @ApiProperty({
    description: '状态',
    required: false,
  })
  @Allow()
  status: string;
}
