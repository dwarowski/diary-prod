import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Student } from '../../students/entities/student.entity';
import { Homework } from './homework.entity';

@Entity('StudentHomework')
export class StudentHomework {
  @ApiProperty({ example: 1, description: 'ID ученика' })
  @PrimaryColumn()
  studentId: number;

  @ManyToOne(() => Student, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'studentId' })
  student: Student;

  @ApiProperty({ example: 1, description: 'ID домашнего задания' })
  @PrimaryColumn()
  homeworkId: number;

  @ManyToOne(() => Homework, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'homeworkId' })
  homework: Homework;

  @ApiProperty({
    example: 'Не выполнено',
    description: 'Статус выполнения задания',
  })
  @Column({ type: 'varchar', length: 50, default: 'Не выполнено' })
  status: string;

  @ApiProperty({
    example: '2025-03-20T15:30:00Z',
    description: 'Дата и время сдачи задания',
    required: false,
  })
  @Column({ type: 'timestamp', nullable: true })
  submittedAt?: Date;
}
