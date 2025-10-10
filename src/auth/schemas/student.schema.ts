import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StudentDocument = Student & Document;

@Schema()
export class Student {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  naam: string;

  @Prop({ required: true })
  studentnummer: string;

  @Prop()
  opleiding?: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const StudentSchema = SchemaFactory.createForClass(Student);