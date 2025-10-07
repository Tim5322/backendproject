import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cats/cats.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { KeuzemodulesController } from './keuzemodules/keuzemodules/keuzemodules.controller';
import { KeuzemodulesService } from './keuzemodules/keuzemodules/keuzemodules.service';
import { KeuzemodulesModule } from './keuzemodules/keuzemodules.module';
import { KeuzemodulesModule } from './keuzemodules/keuzemodules/keuzemodules.module';
import { KeuzemodulesService } from './keuzemodules/keuzemodules/keuzemodules.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI!),
    CatsModule,
    AuthModule,
    UsersModule,
    KeuzemodulesModule,
  ],
  controllers: [KeuzemodulesController],
  providers: [KeuzemodulesService],
})
export class AppModule {}

