import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @Post('/register')
  async register(
    @Body() registerAuthDto: RegisterAuthDto,
    @Res() res: Response,
  ): Promise<Response> {
    await this.authService.register(registerAuthDto);

    return res.json({
      message: 'Register successfully',
    });
  }
}
