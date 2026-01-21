import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { KeuzemodulesService } from '../Services/keuzemodules.service';
import { JwtAuthGuard } from '../Guards/jwt-auth.guard';

@Controller('keuzemodules')
@UseGuards(JwtAuthGuard)
export class KeuzemodulesController {
  constructor(private readonly keuzemoduleService: KeuzemodulesService) {}

  @Get()
  async findAll() {
    return await this.keuzemoduleService.findAll();
  }

  @Get('search')
  async findByFilters(
    @Query('name') name?: string,
    @Query('studycredit') studycredit?: string,
    @Query('level') level?: string,
    @Query('location') location?: string,
  ) {
    const filters: any = { name, level, location };
    if (studycredit !== undefined && studycredit !== '') {
      const parsed = parseInt(studycredit, 10);
      if (!isNaN(parsed)) {
        filters.studycredit = parsed;
      }
    }
    return await this.keuzemoduleService.findByFilters(filters);
  }
}
