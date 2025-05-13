import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Teacher } from '../teachers/entities/teacher.entity'; // Из папки "modules/teachers/entities"
import { Subject } from '../subjects/entities/subject.entity'; // Из папки "modules/subjects/entities"

@Entity('TeacherSubjects')
export class TeacherSubject {
  @ApiProperty({ example: 3, description: 'ID учителя' })
  @PrimaryColumn()
  teacherId: number;

  @ManyToOne(() => Teacher, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'teacherId' })
  teacher: Teacher;

  @ApiProperty({ example: 1, description: 'ID предмета' })
  @PrimaryColumn()
  subjectId: number;

  @ManyToOne(() => Subject, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'subjectId' })
  subject: Subject;
}
