import {
  Controller,
  Get,
  HttpException,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/guards/jwt.guard';
import { UserService } from 'src/modules/system/user/user.service';

@ApiTags('公共接口')
@Controller()
export class CommonController {
  constructor(private readonly userService: UserService) {}

  @Get('getInfo')
  @UseGuards(JwtGuard)
  async getInfo(@Request() req) {
    const info = await this.userService.getInfo(req.user.user_id);
    return info;
  }
}
