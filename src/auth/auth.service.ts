import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Ongeldige inloggegevens');
    }
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    const payload = { email: user.email, sub: user._id, role: user.role };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        email: user.email,
        naam: user.naam,
        role: user.role
      }
    };
  }

  async createDefaultUserIfNeeded() {
    return this.usersService.createDefaultUser();
  }
}
