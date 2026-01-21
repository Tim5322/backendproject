import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
// CatsModule was removed from the project; use PersistenceModule for infra providers
import { PersistenceModule } from './infrastructure/database/persistence.module';
import { AuthModule } from './auth/auth.module';
import { KeuzemodulesModule } from './keuzemodules/keuzemodules.module';
import { FavorietenModule } from './favorieten/favorieten.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI!, {
      serverSelectionTimeoutMS: 5000, // 5 seconden timeout
      socketTimeoutMS: 45000, // 45 seconden voor queries
    }),
  PersistenceModule,
  AuthModule,
  KeuzemodulesModule,
  FavorietenModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

