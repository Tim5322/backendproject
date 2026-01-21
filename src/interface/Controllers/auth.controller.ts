import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../Services/auth.service';
import { LoginDto } from '../Models/login.dto';
import { RegisterDto } from '../Models/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }
}
