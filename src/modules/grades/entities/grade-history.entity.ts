import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Grade } from './grade.entity';
import { User } from '../../users/entities/user.entity';

@Entity('GradeHistory')
export class GradeHistory {
  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор записи истории',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 1,
    description: 'ID оценки, для которой внесено изменение',
  })
  @Column()
  gradeId: number;

  @ManyToOne(() => Grade, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'gradeId' })
  gradeRecord: Grade;

  @ApiProperty({ example: 8, description: 'Старая оценка' })
  @Column({ type: 'int' })
  oldGrade: number;

  @ApiProperty({ example: 10, description: 'Новая оценка' })
  @Column({ type: 'int' })
  newGrade: number;

  @ApiProperty({
    example: 2,
    description: 'ID пользователя, изменившего оценку',
    nullable: true,
  })
  @Column({ type: 'int', nullable: true })
  changedBy: number | null;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'changedBy' })
  changedByUser: User;

  @ApiProperty({ description: 'Дата изменения оценки' })
  @CreateDateColumn({ type: 'timestamp' })
  changedAt: Date;
}
