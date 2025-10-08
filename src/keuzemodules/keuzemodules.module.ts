import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { KeuzemodulesController } from './keuzemodules.controller';
import { KeuzemodulesService } from './keuzemodules.service';
import { keuzemodule, keuzemoduleSchema } from './schemas/keuzemodules.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: keuzemodule.name, schema: keuzemoduleSchema }])],
  controllers: [KeuzemodulesController],
  providers: [KeuzemodulesService]
})
export class KeuzemodulesModule {}
