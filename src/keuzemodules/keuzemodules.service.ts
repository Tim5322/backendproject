import { Injectable } from '@nestjs/common';
import { KeuzemoduleRepository } from '../domain/ports/keuzemodule.repository';
import { KeuzemoduleEntity } from '../domain/entities/keuzemodule.entity';

@Injectable()
export class KeuzemodulesService {
  constructor(private readonly repo: KeuzemoduleRepository) {}

      async findAll(): Promise<KeuzemoduleEntity[]> {
        return this.repo.findAll();
      }

      async findByFilters(filters: {
        name?: string;
        studycredit?: number;
        level?: string;
        location?: string;
      }): Promise<KeuzemoduleEntity[]> {
        return this.repo.findByFilters(filters);
      }
}
