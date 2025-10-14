import { Controller, UseGuards, Request, Get, Delete, Param, Put } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('favorieten')
export class FavorietenController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Put(':keuzemoduleId')
  async addFavoriet(@Request() req, @Param('keuzemoduleId') keuzemoduleId: string) {
    return this.authService.addFavoriet(req.user.userId, parseInt(keuzemoduleId));
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':keuzemoduleId')
  async removeFavoriet(@Request() req, @Param('keuzemoduleId') keuzemoduleId: string) {
    return this.authService.removeFavoriet(req.user.userId, parseInt(keuzemoduleId));
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getFavorieten(@Request() req) {
    return this.authService.getFavorieten(req.user.userId);
  }
}