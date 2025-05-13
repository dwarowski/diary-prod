import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dtos/create-attendance.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { Attendance } from './entities/attendance.entity';

@ApiTags('attendance')
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  @ApiOperation({ summary: 'Создать запись посещаемости' })
  @ApiResponse({
    status: 201,
    description: 'Запись посещаемости создана',
    type: Attendance,
  })
  async create(
    @Body() createAttendanceDto: CreateAttendanceDto,
  ): Promise<Attendance> {
    return this.attendanceService.create(createAttendanceDto);
  }

  @Get('absence-counts')
  @ApiQuery({
    name: 'studentId',
    required: true,
    type: Number,
    description: 'ID ученика',
  })
  @ApiQuery({
    name: 'subjectId',
    required: true,
    type: Number,
    description: 'ID предмета',
  })
  async getAbsenceCounts(
    @Query('studentId') studentId: number,
    @Query('subjectId') subjectId: number,
  ) {
    return this.attendanceService.getAbsenceCounts(studentId, subjectId);
  }

  @Get()
  async getAllAttendances(): Promise<Attendance[]> {
    return this.attendanceService.getAllAttendances();
  }
}
