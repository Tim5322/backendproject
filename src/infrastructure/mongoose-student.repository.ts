import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student, StudentDocument } from '../auth/schemas/student.schema';
import { StudentRepository, StudentEntity } from '../common/interfaces/student-repository.interface';

@Injectable()
export class MongooseStudentRepository implements StudentRepository {
  constructor(@InjectModel(Student.name) private studentModel: Model<StudentDocument>) {}

  private map(doc: any): StudentEntity | null {
    if (!doc) return null;
    const { __v, ...rest } = doc.toObject ? doc.toObject() : doc;
    return new StudentEntity(rest as Partial<StudentEntity>);
  }

  async findByEmail(email: string): Promise<StudentEntity | null> {
    const doc = await this.studentModel.findOne({ email }).exec();
    return this.map(doc);
  }

  async findByStudentnummer(studentnummer: string): Promise<StudentEntity | null> {
    const doc = await this.studentModel.findOne({ studentnummer }).exec();
    return this.map(doc);
  }

  async findById(id: string): Promise<StudentEntity | null> {
    const doc = await this.studentModel.findById(id).exec();
    return this.map(doc);
  }

  async create(student: Partial<StudentEntity>): Promise<StudentEntity> {
    const created = new this.studentModel(student);
    const saved = await created.save();
    return this.map(saved)!;
  }

  async save(student: StudentEntity): Promise<StudentEntity> {
    // assume student has _id
    const doc = await this.studentModel.findById(student._id).exec();
    if (!doc) throw new Error('Student not found');
    Object.assign(doc, student);
    const saved = await doc.save();
    return this.map(saved)!;
  }
}
