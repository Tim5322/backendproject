import { Module } from '@nestjs/common';
import { FavorietenController } from '../interface/Controllers/favorieten.controller';
import { AuthModule } from '../auth.module';
import { FavorietenService } from '../interface/Services/favorieten.service';
import { PersistenceModule } from '../infrastructure/database/persistence.module';

@Module({
  imports: [AuthModule, PersistenceModule],
  controllers: [FavorietenController],
  providers: [FavorietenService],
})
export class FavorietenModule {}
