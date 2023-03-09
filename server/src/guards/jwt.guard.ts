import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(protected readonly reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const not_auth = this.reflector.get<boolean>(
      'not_auth',
      context.getHandler(),
    );
    if (not_auth) return true;

    return (await super.canActivate(context)) as boolean;
  }
}
