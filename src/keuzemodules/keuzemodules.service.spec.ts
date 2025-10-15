import { Test, TestingModule } from '@nestjs/testing';
import { KeuzemodulesService } from './keuzemodules.service';

describe('KeuzemodulesService', () => {
  let service: KeuzemodulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KeuzemodulesService],
    }).compile();

    service = module.get<KeuzemodulesService>(KeuzemodulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
