// Domain-level entity for a Student. Keep this simple and framework-agnostic.
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

export default StudentEntity;
