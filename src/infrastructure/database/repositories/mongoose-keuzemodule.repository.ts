import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Keuzemodule, KeuzemoduleDocument } from '../schemas/keuzemodule.schema';
import { KeuzemoduleRepository, KeuzemoduleFilters } from '../../../domain/repositories/keuzemodule.repository';
import { KeuzemoduleEntity } from '../../../domain/entities/keuzemodule.entity';

@Injectable()
export class MongooseKeuzemoduleRepository implements KeuzemoduleRepository {
  constructor(@InjectModel(Keuzemodule.name) private readonly keuzemoduleModel: Model<KeuzemoduleDocument>) {}

  private map(doc: KeuzemoduleDocument): KeuzemoduleEntity {
    return new KeuzemoduleEntity({
      id: doc.id,
      name: doc.name,
      shortdescription: doc.shortdescription,
      description: doc.description,
      content: doc.content,
      studycredit: doc.studycredit,
      location: doc.location,
      contact_id: doc.contact_id,
      level: doc.level,
      learningoutcomes: doc.learningoutcomes,
    });
  }

  async findAll(): Promise<KeuzemoduleEntity[]> {
    const docs = await this.keuzemoduleModel.find().exec();
    return docs.map((d) => this.map(d));
  }

  async findByFilters(filters: KeuzemoduleFilters): Promise<KeuzemoduleEntity[]> {
    const query: any = {};

    if (filters.name) {
      query.name = { $regex: filters.name, $options: 'i' };
    }
    if (typeof filters.studycredit === 'number') {
      query.studycredit = filters.studycredit;
    }
    if (filters.level) {
      query.level = { $regex: filters.level, $options: 'i' };
    }
    if (filters.location) {
      query.location = { $regex: filters.location, $options: 'i' };
    }

    const docs = await this.keuzemoduleModel.find(query).exec();
    return docs.map((d) => this.map(d));
  }
}

export default MongooseKeuzemoduleRepository;