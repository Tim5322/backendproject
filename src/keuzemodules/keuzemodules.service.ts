import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { keuzemodule, keuzemoduleDocument } from './schemas/keuzemodules.schema';

@Injectable()
export class KeuzemodulesService {
    constructor(@InjectModel(keuzemodule.name) private readonly keuzemoduleModel: Model<keuzemoduleDocument>) {}

      async findAll(): Promise<keuzemodule[]> {
        return this.keuzemoduleModel.find().exec();
      }

      async findByFilters(filters: {
        name?: string;
        studycredit?: number;
        level?: string;
        location?: string;
      }): Promise<keuzemodule[]> {
        const query: any = {};
        
        if (filters.name) {
          query.name = { $regex: filters.name, $options: 'i' }; // Case-insensitive zoeken
        }
        if (filters.studycredit) {
          query.studycredit = filters.studycredit;
        }
        if (filters.level) {
          query.level = { $regex: filters.level, $options: 'i' };
        }
        if (filters.location) {
          query.location = { $regex: filters.location, $options: 'i' };
        }

        return this.keuzemoduleModel.find(query).exec();
      }
}
