import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Student } from '../../students/entities/student.entity';
import { Subject } from '../../subjects/entities/subject.entity';
import { Teacher } from '../../teachers/entities/teacher.entity';

@Entity('Grades')
export class Grade {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор оценки' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 1, description: 'ID ученика' })
  @Column()
  studentId: number;

  @ManyToOne(() => Student, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'studentId' })
  student: Student;

  @ApiProperty({ example: 2, description: 'ID предмета' })
  @Column()
  subjectId: number;

  @ManyToOne(() => Subject, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'subjectId' })
  subject: Subject;

  @ApiProperty({
    example: 10,
    description: 'Оценка ученика',
    minimum: 1,
    maximum: 12,
  })
  @Column({ type: 'int' })
  grade: number;

  @ApiProperty({ example: '2025-03-16', description: 'Дата оценки' })
  @Column({ type: 'date' })
  date: string;

  @ApiProperty({ example: 3, description: 'ID учителя, выставившего оценку' })
  @Column()
  teacherId: number;

  @ManyToOne(() => Teacher, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'teacherId' })
  teacher: Teacher;
}
