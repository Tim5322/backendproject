import { Module } from '@nestjs/common';
import { KeuzemodulesController } from './keuzemodules.controller';
import { KeuzemodulesService } from './keuzemodules.service';

@Module({
  controllers: [KeuzemodulesController],
  providers: [KeuzemodulesService]
})
export class KeuzemodulesModule {}
