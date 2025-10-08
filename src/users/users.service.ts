import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password: _, ...result } = user.toObject();
      return result;
    }
    return null;
  }

//   async createDefaultUser(): Promise<User> {
//     const existingUser = await this.findByEmail('docent@school.nl');
//     if (existingUser) {
//       return existingUser;
//     }

//     const hashedPassword = await bcrypt.hash('wachtwoord123', 10);
//     const defaultUser = new this.userModel({
//       email: 'docent@school.nl',
//       password: hashedPassword,
//       role: 'docent',
//       naam: 'Docent'
//     });

    // return defaultUser.save();
  }
