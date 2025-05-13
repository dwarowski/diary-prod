import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Subject } from '../../subjects/entities/subject.entity';
import { SchoolClass } from '../../classes/entities/class.entity';
import { Teacher } from '../../teachers/entities/teacher.entity';

@Entity('Homework')
export class Homework {
  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор домашнего задания',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 1,
    description: 'ID предмета, к которому относится задание',
  })
  @Column()
  subjectId: number;

  @ManyToOne(() => Subject, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'subjectId' })
  subject: Subject;

  @ApiProperty({
    example: 1,
    description: 'ID класса, для которого выдано задание',
  })
  @Column()
  classId: number;

  @ManyToOne(() => SchoolClass, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'classId' })
  class: SchoolClass;

  @ApiProperty({ example: 3, description: 'ID учителя, который задал задание' })
  @Column()
  teacherId: number;

  @ManyToOne(() => Teacher, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'teacherId' })
  teacher: Teacher;

  @ApiProperty({
    example: 'Решить уравнения...',
    description: 'Описание задания',
  })
  @Column({ type: 'varchar', length: 1024 })
  description: string;

  @ApiProperty({
    example: 'https://example.com/attachment.pdf',
    description: 'URL вложения (при наличии)',
    required: false,
  })
  @Column({ type: 'varchar', length: 512, nullable: true })
  attachmentUrl?: string;

  @ApiProperty({ example: '2025-04-01', description: 'Срок сдачи задания' })
  @Column({ type: 'date' })
  dueDate: string;
}
