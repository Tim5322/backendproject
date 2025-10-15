// Domain entity for Student (simple DTO-like class used by application layer)
export class StudentEntity {
  _id?: any;
  email: string;
  password?: string;
  naam: string;
  studentnummer: string;
  opleiding?: string;
  favorieten?: number[];
  createdAt?: Date;

  constructor(init?: Partial<StudentEntity>) {
    Object.assign(this, init);
  }
}

// Use an abstract class as the DI token so we can keep constructor typings (emitDecoratorMetadata)
export abstract class StudentRepository {
  abstract findByEmail(email: string): Promise<StudentEntity | null>;
  abstract findByStudentnummer(studentnummer: string): Promise<StudentEntity | null>;
  abstract findById(id: string): Promise<StudentEntity | null>;
  abstract create(student: Partial<StudentEntity>): Promise<StudentEntity>;
  abstract save(student: StudentEntity): Promise<StudentEntity>;
}
