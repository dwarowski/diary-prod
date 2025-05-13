import { IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty({ example: '2005-05-10', description: 'Дата рождения ученика' })
  readonly birthDate: string;

  @ApiProperty({
    example: 'г. Москва, ул. Ленина, д. 1',
    description: 'Адрес проживания ученика',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly address?: string;

  @ApiProperty({
    example: '+7 (123) 456-78-90',
    description: 'Контактный телефон ученика',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly phone?: string;

  @ApiProperty({
    example: 1,
    description: 'ID класса ученика',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  readonly classId?: number;
}
