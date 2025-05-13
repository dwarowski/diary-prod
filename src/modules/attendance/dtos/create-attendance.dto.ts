import { IsNotEmpty, IsInt, IsDateString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AttendanceStatus } from '../../../common/enums/attendance-status.enum';

export class CreateAttendanceDto {
  @ApiProperty({ example: 1, description: 'ID ученика' })
  @IsNotEmpty()
  @IsInt()
  studentId: number;

  @ApiProperty({
    example: '2025-03-16',
    description: 'Дата записи посещаемости',
  })
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @ApiProperty({
    example: AttendanceStatus.Present,
    description: 'Статус посещаемости',
  })
  @IsNotEmpty()
  @IsEnum(AttendanceStatus)
  status: AttendanceStatus;
}
