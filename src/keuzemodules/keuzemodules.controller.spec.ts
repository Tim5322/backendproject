import { Test, TestingModule } from '@nestjs/testing';
import { KeuzemodulesController } from './keuzemodules.controller';
import { KeuzemodulesService } from './keuzemodules.service';

describe('KeuzemodulesController', () => {
  let controller: KeuzemodulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KeuzemodulesController],
      providers: [
        {
          provide: KeuzemodulesService,
          useValue: {
            findAll: jest.fn(),
            findByFilters: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<KeuzemodulesController>(KeuzemodulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
