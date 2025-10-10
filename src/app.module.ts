import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cats/cats.module';
import { AuthModule } from './auth/auth.module';
import { KeuzemodulesModule } from './keuzemodules/keuzemodules.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI!, {
      serverSelectionTimeoutMS: 5000, // 5 seconden timeout
      socketTimeoutMS: 45000, // 45 seconden voor queries
    }),
    CatsModule,
    AuthModule,
    KeuzemodulesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

