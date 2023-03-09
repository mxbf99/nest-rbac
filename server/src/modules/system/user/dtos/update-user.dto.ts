import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: '邮箱',
    example: 'testemail',
    required: false,
  })
  email: string;

  @IsOptional()
  @IsString()
  @Length(11)
  @ApiProperty({
    description: '手机号',
    example: 'testphone',
    required: false,
  })
  phone: string;

  @IsNotEmpty({ message: '角色不能为空' })
  @ApiProperty({
    description: '角色',
    example: '1',
    required: true,
  })
  role_ids?: number[] = [1];
}
