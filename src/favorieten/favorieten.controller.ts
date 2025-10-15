import { Controller, UseGuards, Request, Get, Delete, Param, Put } from '@nestjs/common';
import { FavorietenService } from './favorieten.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('favorieten')
export class FavorietenController {
  constructor(private readonly favorietenService: FavorietenService) {}

  @UseGuards(JwtAuthGuard)
  @Put(':keuzemoduleId')
  async addFavoriet(@Request() req, @Param('keuzemoduleId') keuzemoduleId: string) {
  return this.favorietenService.addFavoriet(req.user.userId, parseInt(keuzemoduleId));
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':keuzemoduleId')
  async removeFavoriet(@Request() req, @Param('keuzemoduleId') keuzemoduleId: string) {
  return this.favorietenService.removeFavoriet(req.user.userId, parseInt(keuzemoduleId));
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getFavorieten(@Request() req) {
  return this.favorietenService.getFavorieten(req.user.userId);
  }
}