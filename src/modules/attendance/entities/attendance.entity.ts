import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { AttendanceStatus } from '../../../common/enums/attendance-status.enum';
import { User } from 'src/modules/users/entities/user.entity';
import { Subject } from '../../subjects/entities/subject.entity';

@Entity('Attendance')
export class Attendance {
  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор записи посещаемости',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 1, description: 'ID ученика' })
  @Column()
  studentId: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'studentId' })
  student: User;

  @ApiProperty({
    example: '2025-03-16',
    description: 'Дата записи посещаемости',
  })
  @Column({ type: 'date' })
  date: string;

  @ApiProperty({
    example: AttendanceStatus.Present,
    description: 'Статус посещаемости',
  })
  @Column({ type: 'enum', enum: AttendanceStatus })
  status: AttendanceStatus;

  @ApiProperty({ example: 1, description: 'ID предмета' })
  @Column({ nullable: true }) // Make it nullable
  subjectId: number;

  @ManyToOne(() => Subject, (subject) => subject.attendances)
  @JoinColumn({ name: 'subjectId' })
  subject: Subject;
}
