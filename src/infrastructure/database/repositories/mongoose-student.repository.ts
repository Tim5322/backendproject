import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student, StudentDocument } from '../schemas/student.schema';
import { StudentRepository } from '../../../domain/repositories/student.repository';
import { StudentEntity } from '../../../domain/entities/student.entity';

@Injectable()
export class MongooseStudentRepository implements StudentRepository {
  constructor(@InjectModel(Student.name) private studentModel: Model<StudentDocument>) {}

  private map(doc: StudentDocument | null): StudentEntity | null {
    if (!doc) return null;
    return new StudentEntity({
      _id: doc._id?.toString(),
      email: doc.email,
      password: doc.password,
      naam: doc.naam,
      studentnummer: doc.studentnummer,
      opleiding: doc.opleiding,
      favorieten: doc.favorieten,
      createdAt: doc.createdAt,
    });
  }

  async create(student: Partial<StudentEntity>): Promise<StudentEntity> {
    const created = new this.studentModel(student);
    const saved = await created.save();
    return this.map(saved)!;
  }

  async findByEmail(email: string): Promise<StudentEntity | null> {
    const doc = await this.studentModel.findOne({ email }).exec();
    return this.map(doc);
  }

  async findById(id: string): Promise<StudentEntity | null> {
    const doc = await this.studentModel.findById(id).exec();
    return this.map(doc);
  }

  async addFavoriet(studentId: string, favorietId: number): Promise<void> {
    await this.studentModel.findByIdAndUpdate(studentId, { $addToSet: { favorieten: favorietId } }).exec();
  }

  async removeFavoriet(studentId: string, favorietId: number): Promise<void> {
    await this.studentModel.findByIdAndUpdate(studentId, { $pull: { favorieten: favorietId } }).exec();
  }
    
  async findByStudentnummer(studentnummer: string): Promise<StudentEntity | null> {
    const doc = await this.studentModel.findOne({ studentnummer }).exec();
    return this.map(doc);
  }
    
  async save(student: StudentEntity): Promise<StudentEntity> {
    const updated = await this.studentModel.findByIdAndUpdate(student._id, student, { new: true }).exec();
    return this.map(updated)!;
  }
}

export default MongooseStudentRepository;