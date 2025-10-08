import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { KeuzemodulesService } from './keuzemodules.service';

@Controller('keuzemodules')
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

