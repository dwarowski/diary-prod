import { IsInt, IsDateString, Min, Max, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGradeDto {
  @ApiProperty({ example: 1, description: 'ID ученика' })
  @IsNotEmpty()
  @IsInt()
  studentId: number;

  @ApiProperty({ example: 2, description: 'ID предмета' })
  @IsNotEmpty()
  @IsInt()
  subjectId: number;

  @ApiProperty({
    example: 10,
    description: 'Оценка ученика',
    minimum: 1,
    maximum: 12,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(12)
  grade: number;

  @ApiProperty({ example: '2025-03-16', description: 'Дата оценки' })
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @ApiProperty({ example: 3, description: 'ID учителя, выставившего оценку' })
  @IsNotEmpty()
  @IsInt()
  teacherId: number;
}
