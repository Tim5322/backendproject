import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  naam: string;

  @IsString()
  @Matches(/^\d+$/, { message: 'studentnummer mag alleen cijfers bevatten' })
  studentnummer: string;

  @IsOptional()
  @IsString()
  opleiding?: string;
}
