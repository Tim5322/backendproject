import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { StudentRepository } from '../../domain/repositories/student.repository';

@Injectable()
export class FavorietenService {
  constructor(private readonly studentRepository: StudentRepository) {}

  async addFavoriet(studentId: string, keuzemoduleId: number) {
    const student = await this.studentRepository.findById(studentId);
    if (!student) throw new UnauthorizedException('Student niet gevonden');

    student.favorieten = student.favorieten ?? [];
    if (student.favorieten.length >= 5) throw new ConflictException('Maximaal 5 favorieten toegestaan');
    if (student.favorieten.includes(keuzemoduleId)) throw new ConflictException('Keuzemodule staat al in favorieten');

    student.favorieten = [...student.favorieten, keuzemoduleId];
    await this.studentRepository.save(student);
    return { message: 'Favoriet toegevoegd', favorieten: student.favorieten };
  }

  async removeFavoriet(studentId: string, keuzemoduleId: number) {
    const student = await this.studentRepository.findById(studentId);
    if (!student) throw new UnauthorizedException('Student niet gevonden');

    student.favorieten = (student.favorieten ?? []).filter(id => id !== keuzemoduleId);
    await this.studentRepository.save(student);
    return { message: 'Favoriet verwijderd', favorieten: student.favorieten };
  }

  async getFavorieten(studentId: string) {
    const student = await this.studentRepository.findById(studentId);
    if (!student) throw new UnauthorizedException('Student niet gevonden');
    return { favorieten: student.favorieten ?? [] };
  }
}

export default FavorietenService;