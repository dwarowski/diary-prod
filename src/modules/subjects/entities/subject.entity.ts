import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { SchoolClass } from '../../classes/entities/class.entity';
import { Attendance } from 'src/modules/attendance/entities/attendance.entity';

@Entity()
export class Subject {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор предмета' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Математика', description: 'Название предмета' })
  @Column({ length: 255 })
  subjectName: string;

  @ApiProperty({
    example: 'Изучение алгебры, геометрии и тригонометрии',
    description: 'Описание предмета',
    required: false,
  })
  @Column({ type: 'varchar', length: 1024, nullable: true })
  description: string;

  // Отношение "многие ко многим" с классами (опционально)
  @ManyToMany(() => SchoolClass, (schoolClass) => schoolClass.subjects)
  classes: SchoolClass[];

  @OneToMany(() => Attendance, (attendance) => attendance.subject)
  attendances: Attendance[];
}
