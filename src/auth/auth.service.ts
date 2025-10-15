import { Injectable, UnauthorizedException, ConflictException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { StudentRepository, StudentEntity } from '../common/interfaces/student-repository.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly studentRepository: StudentRepository,
    private jwtService: JwtService
  ) {}

  async register(registerDto: RegisterDto) {
    // Check of email al bestaat
    const existingStudent = await this.studentRepository.findByEmail(registerDto.email);
    if (existingStudent) {
      throw new ConflictException('Email adres is al in gebruik');
    }

    // Check of studentnummer al bestaat
    const existingStudentNumber = await this.studentRepository.findByStudentnummer(registerDto.studentnummer);
    if (existingStudentNumber) {
      throw new ConflictException('Studentnummer is al in gebruik');
    }

    // Hash wachtwoord
    const hashedPassword = await bcrypt.hash(registerDto.password, 8);

    // Maak nieuwe student aan via repository
    const savedStudent = await this.studentRepository.create({
      ...registerDto,
      password: hashedPassword,
    });

    const { password, ...result } = savedStudent as any;
    return result;
  }

  async validateStudent(email: string, password: string): Promise<any> {
    const student = await this.studentRepository.findByEmail(email);
    if (student && student.password && await bcrypt.compare(password, student.password)) {
      const { password: _, ...result } = student as any;
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
      studentnummer: student.studentnummer,
    };

    return {
      access_token: this.jwtService.sign(payload),
      student: {
        email: student.email,
        naam: student.naam,
        studentnummer: student.studentnummer,
        opleiding: student.opleiding,
      },
    };
  }
}
