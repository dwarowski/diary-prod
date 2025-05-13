import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSubjectDto {
  @ApiProperty({ example: 'Математика', description: 'Название предмета' })
  @IsNotEmpty()
  @IsString()
  readonly subjectName: string;

  @ApiPropertyOptional({
    example: 'Изучение алгебры, геометрии и тригонометрии',
    description: 'Описание предмета',
  })
  @IsOptional()
  @IsString()
  readonly description?: string;
}
