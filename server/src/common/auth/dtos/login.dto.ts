import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: '用户名/邮箱/手机号',
    example: 'testuser',
    required: true,
  })
  @IsNotEmpty({ message: '用户名/邮箱/手机号' })
  account: string;

  @ApiProperty({
    description: '密码',
    example: 'testpassword',
    required: true,
  })
  @IsNotEmpty({ message: '密码不能为空' })
  @IsString({ message: '密码必须为字符串' })
  password: string;
}
