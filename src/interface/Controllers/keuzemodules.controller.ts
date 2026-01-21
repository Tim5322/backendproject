import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { KeuzemodulesService } from '../Services/keuzemodules.service';
import { JwtAuthGuard } from '../Guards/jwt-auth.guard';

@Controller('keuzemodules')
@UseGuards(JwtAuthGuard)
export class KeuzemodulesController {
  constructor(private readonly keuzemoduleService: KeuzemodulesService) {}

  @Get()
  findAll() {
    return this.keuzemoduleService.findAll();
  }

  @Get('search')
  findByFilters(
    @Query('name') name?: string,
    @Query('studycredit') studycredit?: number,
    @Query('level') level?: string,
    @Query('location') location?: string,
  ) {
    return this.keuzemoduleService.findByFilters({ name, studycredit, level, location });
  }
}
