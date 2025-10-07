import { Test, TestingModule } from '@nestjs/testing';
import { KeuzemodulesController } from './keuzemodules.controller';

describe('KeuzemodulesController', () => {
  let controller: KeuzemodulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KeuzemodulesController],
    }).compile();

    controller = module.get<KeuzemodulesController>(KeuzemodulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
