import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Teacher {
  @ApiProperty({
    example: 1,
    description: 'Идентификатор пользователя-учителя (связь с Users)',
  })
  @PrimaryColumn()
  userId: number;

  @OneToOne(() => User, { cascade: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ApiProperty({ example: '2020-09-01', description: 'Дата приема на работу' })
  @Column({ type: 'date' })
  hireDate: Date;

  @ApiProperty({
    example: 'PhD in Mathematics',
    description: 'Учёная степень или квалификация',
    required: false,
  })
  @Column({ type: 'varchar', length: 255, nullable: true })
  degree: string;
}
