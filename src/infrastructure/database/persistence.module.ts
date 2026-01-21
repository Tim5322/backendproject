import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './schemas/student.schema';
import { Keuzemodule, KeuzemoduleSchema } from './schemas/keuzemodule.schema';
import { MongooseStudentRepository } from './repositories/mongoose-student.repository';
import { StudentRepository } from '../../domain/repositories/student.repository';
import { MongooseKeuzemoduleRepository } from './repositories/mongoose-keuzemodule.repository';
import { KeuzemoduleRepository } from '../../domain/repositories/keuzemodule.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Student.name, schema: StudentSchema },
      { name: Keuzemodule.name, schema: KeuzemoduleSchema },
    ]),
  ],
  providers: [
    MongooseStudentRepository,
    { provide: StudentRepository, useClass: MongooseStudentRepository },
    MongooseKeuzemoduleRepository,
    { provide: KeuzemoduleRepository, useClass: MongooseKeuzemoduleRepository },
  ],
  exports: [StudentRepository, KeuzemoduleRepository, MongooseModule],
})
export class PersistenceModule {}
