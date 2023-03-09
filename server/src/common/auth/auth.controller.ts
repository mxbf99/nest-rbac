import {
  Request,
  Body,
  Controller,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dtos/login.dto';
import { AuthService } from './auth.service';
import { RedisService } from '../redis/redis.service';
import { JwtGuard } from 'src/guards/jwt.guard';

@ApiTags('认证接口')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly redis: RedisService,
  ) {}

  @ApiOperation({ summary: '登录' })
  @Post('login')
  login(@Request() req: any, @Body() account: LoginDto) {
    return this.authService.login(account);
  }

  @ApiOperation({ summary: '退出登录' })
  @Post('logout')
  @UseGuards(JwtGuard)
  logout(@Request() req: any) {
    return this.authService.logout(req.user.uuid);
  }
}
