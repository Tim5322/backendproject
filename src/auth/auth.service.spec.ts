import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { StudentRepository } from '../domain/ports/student.repository';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: StudentRepository,
          useValue: {
            findByEmail: jest.fn(),
            findByStudentnummer: jest.fn(),
            create: jest.fn(),
            findById: jest.fn(),
            save: jest.fn(),
            addFavoriet: jest.fn(),
            removeFavoriet: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('token'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
