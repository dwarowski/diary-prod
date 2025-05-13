import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { SchoolClass } from '../classes/entities/class.entity'; // Если файл называется class.entity.ts
import { Subject } from '../subjects/entities/subject.entity'; // Из папки "modules/subjects/entities"

@Entity('ClassSubjects')
export class ClassSubject {
  @ApiProperty({ example: 1, description: 'ID класса' })
  @PrimaryColumn()
  classId: number;

  @ManyToOne(() => SchoolClass, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'classId' })
  class: SchoolClass;

  @ApiProperty({ example: 1, description: 'ID предмета' })
  @PrimaryColumn()
  subjectId: number;

  @ManyToOne(() => Subject, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'subjectId' })
  subject: Subject;
}
