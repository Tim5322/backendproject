import { StudentEntity } from '../entities/student.entity';

export abstract class StudentRepository {
  abstract create(student: Partial<StudentEntity>): Promise<StudentEntity>;
  abstract findByEmail(email: string): Promise<StudentEntity | null>;
  abstract findByStudentnummer(studentnummer: string): Promise<StudentEntity | null>;
  abstract findById(id: string): Promise<StudentEntity | null>;
  abstract addFavoriet(studentId: string, favorietId: number): Promise<void>;
  abstract removeFavoriet(studentId: string, favorietId: number): Promise<void>;
  abstract save(student: StudentEntity): Promise<StudentEntity>;
}

export default StudentRepository;
