import { IsNotEmpty, IsString, IsInt, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateClassDto {
  @ApiProperty({ example: '10А', description: 'Название класса' })
  @IsNotEmpty()
  @IsString()
  readonly className: string;

  @ApiProperty({ example: 2025, description: 'Учебный год' })
  @IsNotEmpty()
  @IsInt()
  readonly academicYear: number;

  @ApiProperty({ example: 'МБОУ СОШ №21', description: 'Навание школы' })
  @IsNotEmpty()
  @IsString()
  school: string;
}
