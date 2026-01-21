export interface KeuzemoduleFilters {
  name?: string;
  studycredit?: number;
  level?: string;
  location?: string;
}

export abstract class KeuzemoduleRepository {
  abstract findAll(): Promise<import('../entities/keuzemodule.entity').KeuzemoduleEntity[]>;
  abstract findByFilters(filters: KeuzemoduleFilters): Promise<import('../entities/keuzemodule.entity').KeuzemoduleEntity[]>;
}

export default KeuzemoduleRepository;
