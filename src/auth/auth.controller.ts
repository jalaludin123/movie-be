import { Controller, Get, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './guard/google.auth.guard';
import { Req } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  loginGoogle() {
    return { msg: "ok" }
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  redirectGoogle(@Req() req) {
    return this.authService.loginGoogle(req.user);
  }
}
