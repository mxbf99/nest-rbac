import { Expose, Type } from 'class-transformer';

export class MenuDto {
  @Expose()
  name: string;
}

export class MenuListDto extends MenuDto {
  @Expose()
  @Type(() => MenuListDto)
  children: MenuDto[];
}
