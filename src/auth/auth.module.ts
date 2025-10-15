import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Student, StudentSchema } from './schemas/student.schema';
import { JwtStrategy } from './strategies/jwt.strategy';
import { MongooseStudentRepository } from '../infrastructure/mongoose-student.repository';
import { StudentRepository } from '../common/interfaces/student-repository.interface';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'jouw-geheime-sleutel',
        signOptions: { expiresIn: '24h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    MongooseStudentRepository,
    { provide: StudentRepository, useClass: MongooseStudentRepository },
  ],
  exports: [AuthService, StudentRepository],
})
export class AuthModule {}
