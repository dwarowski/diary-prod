// src/schedule/dto/create-schedule.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsString,
  IsDateString,
} from 'class-validator';
import { WeekDay } from '../../../common/enums/week-day.enum';

export class CreateScheduleDto {
  @ApiProperty({ example: 1, description: 'ID класса' })
  @IsNumber()
  @IsNotEmpty()
  classId: number;

  @ApiProperty({ example: 1, description: 'ID предмета' })
  @IsNumber()
  @IsNotEmpty()
  subjectId: number;

  @ApiProperty({ example: WeekDay.Monday, description: 'День недели' })
  @IsEnum(WeekDay)
  @IsNotEmpty()
  dayOfWeek: WeekDay;

  @ApiProperty({ example: '09:00:00', description: 'Время начала урока' })
  @IsString()
  @IsNotEmpty()
  startTime: string;

  @ApiProperty({ example: '09:45:00', description: 'Время окончания урока' })
  @IsString()
  @IsNotEmpty()
  endTime: string;

  @ApiProperty({ example: '2023-10-27', description: 'Дата урока' })
  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @ApiProperty({ example: 'Тема урока', description: 'Тема урока' })
  @IsString()
  @IsNotEmpty()
  topic: string;

  @ApiProperty({ example: 'Домашнее задание', description: 'Домашнее задание' })
  @IsString()
  @IsNotEmpty()
  homework: string;
}
