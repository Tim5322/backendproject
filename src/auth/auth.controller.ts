import { Controller, Post, Body, OnModuleInit } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController implements OnModuleInit {
  constructor(private authService: AuthService) {}

  async onModuleInit() {
    // Maak standaard user aan bij opstarten
    await this.authService.createDefaultUserIfNeeded();
    console.log('Standaard user aangemaakt: docent@school.nl / wachtwoord123');
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }
}
