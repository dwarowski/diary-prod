import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { WeekDay } from '../../../common/enums/week-day.enum';
import { SchoolClass } from '../../classes/entities/class.entity';
import { Subject } from '../../subjects/entities/subject.entity';

@Entity('Schedule')
export class Schedule {
  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор записи расписания',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 1, description: 'ID класса' })
  @Column()
  classId: number;

  @ManyToOne(() => SchoolClass, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'classId' })
  class: SchoolClass;

  @ApiProperty({ example: 1, description: 'ID предмета' })
  @Column()
  subjectId: number;

  @ManyToOne(() => Subject, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'subjectId' })
  subject: Subject;

  @ApiProperty({ example: WeekDay.Monday, description: 'День недели' })
  @Column({ type: 'enum', enum: WeekDay })
  dayOfWeek: WeekDay;

  @ApiProperty({ example: '09:00:00', description: 'Время начала урока' })
  @Column({ type: 'time' })
  startTime: string;

  @ApiProperty({ example: '09:45:00', description: 'Время окончания урока' })
  @Column({ type: 'time' })
  endTime: string;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  topic: string;

  @Column()
  homework: string;
}
