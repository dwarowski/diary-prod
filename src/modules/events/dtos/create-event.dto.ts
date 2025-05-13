import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDateString,
  IsInt,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({ example: 'Школьный концерт', description: 'Название события' })
  @IsNotEmpty()
  @IsString()
  readonly eventName: string;

  @ApiPropertyOptional({
    example: 'Концерт учеников старших классов',
    description: 'Описание события',
  })
  @IsOptional()
  @IsString()
  readonly description?: string;

  @ApiProperty({
    example: '2025-04-20',
    description: 'Дата проведения события',
  })
  @IsNotEmpty()
  @IsDateString()
  readonly eventDate: string;

  @ApiProperty({ example: 1, description: 'ID организатора события' })
  @IsNotEmpty()
  @IsInt()
  readonly organizerId: number;
}
