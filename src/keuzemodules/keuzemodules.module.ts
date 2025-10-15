import { Module } from '@nestjs/common';
import { KeuzemodulesController } from './keuzemodules.controller';
import { KeuzemodulesService } from './keuzemodules.service';
import { KeuzemoduleRepository } from '../domain/ports/keuzemodule.repository';
import { PersistenceModule } from '../infrastructure/persistence/persistence.module';

@Module({
  imports: [PersistenceModule],
  controllers: [KeuzemodulesController],
  providers: [KeuzemodulesService]
})
export class KeuzemodulesModule {}
