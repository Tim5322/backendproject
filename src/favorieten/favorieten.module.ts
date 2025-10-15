import { Module } from '@nestjs/common';
import { FavorietenController } from './favorieten.controller';
import { AuthModule } from '../auth/auth.module';
import { FavorietenService } from './favorieten.service';
import { PersistenceModule } from '../infrastructure/persistence/persistence.module';

@Module({
  imports: [AuthModule, PersistenceModule],
  controllers: [FavorietenController],
  providers: [FavorietenService],
})
export class FavorietenModule {}
