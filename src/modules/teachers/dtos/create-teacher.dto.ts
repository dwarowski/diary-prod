import {
  IsDateString,
  IsOptional,
  IsString,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTeacherDto {
  @ApiProperty({ example: '2020-09-01', description: 'Дата приема на работу' })
  @IsNotEmpty()
  @IsDateString()
  readonly hireDate: string;

  @ApiProperty({
    example: 'PhD in Mathematics',
    description: 'Учёная степень или квалификация',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly degree?: string;
}
