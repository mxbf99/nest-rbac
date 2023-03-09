import { SetMetadata } from '@nestjs/common';

export const CheckPermission = (permission: string) =>
  SetMetadata('permission', permission);

export const NotAuth = () => SetMetadata('not_auth', true);
