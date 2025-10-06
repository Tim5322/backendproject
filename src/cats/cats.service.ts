import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat, CatDocument } from './schemas/cat.schema';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<CatDocument>) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }

  async findOne(id: string): Promise<Cat | null> {
    return this.catModel.findById(id).exec();
  }

  async update(id: string, updateCatDto: UpdateCatDto): Promise<Cat | null> {
    return this.catModel.findByIdAndUpdate(id, updateCatDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Cat | null> {
    return this.catModel.findByIdAndDelete(id).exec();
  }
}
