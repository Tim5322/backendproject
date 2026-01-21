import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { StudentRepository } from '../../domain/repositories/student.repository';
import * as bcrypt from 'bcrypt';

// Keep application independent of interface DTOs by using a local input type
export interface RegisterInput {
  email: string;
  password: string;
  naam: string;
  studentnummer: string;
  opleiding?: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly studentRepository: StudentRepository,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterInput) {
    const existingStudent = await this.studentRepository.findByEmail(registerDto.email);
    if (existingStudent) {
      throw new ConflictException('Email adres is al in gebruik');
    }

    const existingStudentNumber = await this.studentRepository.findByStudentnummer(registerDto.studentnummer);
    if (existingStudentNumber) {
      throw new ConflictException('Studentnummer is al in gebruik');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 8);
    const created = await this.studentRepository.create({ ...registerDto, password: hashedPassword });
    const { password, ...result } = (created as any);
    return result;
  }

  async validateStudent(email: string, password: string): Promise<any> {
    const student = await this.studentRepository.findByEmail(email);
    if (student && student.password && await bcrypt.compare(password, student.password)) {
      const { password: _, ...result } = (student as any);
      return result;
    }
    return null;
  }

  async login(email: string, password: string) {
    const student = await this.validateStudent(email, password);
    if (!student) {
      throw new UnauthorizedException('Ongeldige inloggegevens');
    }
    const payload = { 
      email: student.email, 
      sub: student._id, 
      studentnummer: student.studentnummer 
    };
    return {
      access_token: this.jwtService.sign(payload),
      student: {
        email: student.email,
        naam: student.naam,
        studentnummer: student.studentnummer,
        opleiding: student.opleiding
      }
    };
  }

  async addFavoriet(studentId: string, keuzemoduleId: number) {
    const student = await this.studentRepository.findById(studentId);
    if (!student) {
      throw new UnauthorizedException('Student niet gevonden');
    }
    student.favorieten = student.favorieten ?? [];
    if (student.favorieten.length >= 5) {
      throw new ConflictException('Maximaal 5 favorieten toegestaan');
    }
    if (student.favorieten.includes(keuzemoduleId)) {
      throw new ConflictException('Keuzemodule staat al in favorieten');
    }
    student.favorieten = [...student.favorieten, keuzemoduleId];
    await this.studentRepository.save(student);
    return { message: 'Favoriet toegevoegd', favorieten: student.favorieten };
  }

  async removeFavoriet(studentId: string, keuzemoduleId: number) {
    const student = await this.studentRepository.findById(studentId);
    if (!student) {
      throw new UnauthorizedException('Student niet gevonden');
    }
    student.favorieten = (student.favorieten ?? []).filter(id => id !== keuzemoduleId);
    await this.studentRepository.save(student);
    return { message: 'Favoriet verwijderd', favorieten: student.favorieten };
  }

  async getFavorieten(studentId: string) {
    const student = await this.studentRepository.findById(studentId);
    if (!student) {
      throw new UnauthorizedException('Student niet gevonden');
    }
    return { favorieten: student.favorieten ?? [] };
  }
}

export default AuthService;