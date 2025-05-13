import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from './entities/attendance.entity';
import { CreateAttendanceDto } from './dtos/create-attendance.dto';
import { AttendanceStatus } from 'src/common/enums/attendance-status.enum';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,
  ) {}

  async create(createAttendanceDto: CreateAttendanceDto): Promise<Attendance> {
    const attendance = this.attendanceRepository.create(createAttendanceDto);
    return this.attendanceRepository.save(attendance);
  }

  async getAbsenceCounts(
    studentId: number,
    subjectId: number,
  ): Promise<{ absentWithoutReason: number; ill: number; total: number }> {
    const attendances = await this.attendanceRepository.find({
      where: { studentId, subjectId },
    });

    let absentWithoutReason = 0;
    let ill = 0;
    const total = attendances.length;

    attendances.forEach((attendance) => {
      if (attendance.status === AttendanceStatus.Absent) {
        absentWithoutReason++;
      } else if (attendance.status === AttendanceStatus.Ill) {
        ill++;
      }
    });

    return { absentWithoutReason, ill, total };
  }

  async getAllAttendances(): Promise<Attendance[]> {
    return this.attendanceRepository.find({
      relations: ['student', 'subject'],
    }); // Load related entities
  }
}
