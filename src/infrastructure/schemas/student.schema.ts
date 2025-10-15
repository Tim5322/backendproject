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

  @Prop({ 
    required: true, 
    unique: true,
    match: [/^\d+$/, 'Studentnummer mag alleen cijfers bevatten']
  })
  studentnummer: string;

  @Prop()
  opleiding?: string;

  @Prop({ type: [Number], default: [], validate: [arrayLimit, 'Maximaal 5 favorieten toegestaan'] })
  favorieten: number[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

function arrayLimit(val: number[]) {
  return val.length <= 5;
}

export const StudentSchema = SchemaFactory.createForClass(Student);

export default Student;
