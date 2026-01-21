import { Module } from '@nestjs/common';
import { KeuzemodulesController } from '../interface/Controllers/keuzemodules.controller';
import { KeuzemodulesService } from '../interface/Services/keuzemodules.service';
import { KeuzemoduleRepository } from '../domain/repositories/keuzemodule.repository';
import { PersistenceModule } from '../infrastructure/database/persistence.module';

@Module({
  imports: [PersistenceModule],
  controllers: [KeuzemodulesController],
  providers: [KeuzemodulesService]
})
export class KeuzemodulesModule {}
