import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from '../schemas/student.schema';
import { MongooseStudentRepository } from '../mongoose-student.repository';
import { StudentRepository } from '../../domain/ports/student.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }])],
  providers: [MongooseStudentRepository, { provide: StudentRepository, useClass: MongooseStudentRepository }],
  exports: [StudentRepository, MongooseModule],
})
export class PersistenceModule {}
