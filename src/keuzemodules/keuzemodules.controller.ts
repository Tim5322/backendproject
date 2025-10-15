import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { KeuzemodulesService } from './keuzemodules.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

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

