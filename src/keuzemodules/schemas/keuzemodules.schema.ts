import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type keuzemoduleDocument = keuzemodule & Document;

@Schema()
export class keuzemodule{
    @Prop({ required: true })
    id: number;

    @Prop({ required: true })
    name: string; 

    @Prop({ required: true })
    shortdescription: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    content: string;

    @Prop({ required: true })
    studycredit: number;

    @Prop({ required: true })
    location: string;

    @Prop({ required: true })
    contact_id: number;

    @Prop({ required: true })
    level: string; 

    @Prop({ required: true })
    learningoutcomes: string;
}

export const keuzemoduleSchema = SchemaFactory.createForClass(keuzemodule);