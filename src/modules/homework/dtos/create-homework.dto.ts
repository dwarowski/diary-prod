import {
  IsNotEmpty,
  IsInt,
  IsString,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateHomeworkDto {
  @ApiProperty({ example: 1, description: 'ID предмета' })
  @IsNotEmpty()
  @IsInt()
  readonly subjectId: number;

  @ApiProperty({ example: 1, description: 'ID класса' })
  @IsNotEmpty()
  @IsInt()
  readonly classId: number;

  @ApiProperty({ example: 3, description: 'ID учителя' })
  @IsNotEmpty()
  @IsInt()
  readonly teacherId: number;

  @ApiProperty({
    example: 'Решить уравнения...',
    description: 'Описание задания',
  })
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiPropertyOptional({
    example: 'https://example.com/attachment.pdf',
    description: 'URL вложения',
  })
  @IsOptional()
  @IsString()
  readonly attachmentUrl?: string;

  @ApiProperty({ example: '2025-04-01', description: 'Срок сдачи задания' })
  @IsNotEmpty()
  @IsDateString()
  readonly dueDate: string;
}
