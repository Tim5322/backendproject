import { Test, TestingModule } from '@nestjs/testing';
import { KeuzemodulesService } from './keuzemodules.service';
import { KeuzemoduleRepository } from '../domain/ports/keuzemodule.repository';

describe('KeuzemodulesService', () => {
  let service: KeuzemodulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KeuzemodulesService,
        {
          provide: KeuzemoduleRepository,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            findByFilters: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    service = module.get<KeuzemodulesService>(KeuzemodulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
