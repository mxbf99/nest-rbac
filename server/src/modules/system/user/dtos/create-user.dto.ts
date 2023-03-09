import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Length, MAX } from 'class-validator';
import { UpdateUserDto } from './update-user.dto';

export class CreateUserDto extends PartialType(UpdateUserDto) {
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString()
  @Length(5, 32)
  @ApiProperty({
    description: '用户名',
    example: 'testuser',
  })
  username: string;

  @IsNotEmpty({ message: '密码不能为空' })
  @IsString()
  @Length(6, 32)
  @ApiProperty({
    description: '密码',
    example: 'testpassword',
    required: true,
  })
  password: string;
}
