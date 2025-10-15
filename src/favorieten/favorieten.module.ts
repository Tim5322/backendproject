import { FavorietenService } from './favorieten.service';
import { FavorietenController } from './favorieten.controller';
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [FavorietenController],
  providers: [FavorietenService],
  exports: [FavorietenService],
})
export class FavorietenModule {}
