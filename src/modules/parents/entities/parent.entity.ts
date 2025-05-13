import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Parent {
  @ApiProperty({
    example: 1,
    description:
      'Идентификатор пользователя (родителя), связанный с таблицей Users',
  })
  @PrimaryColumn()
  userId: number;

  @OneToOne(() => User, { cascade: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ApiProperty({
    example: 'ООО Рога и Копыта',
    description: 'Место работы родителя',
    required: false,
  })
  @Column({ type: 'varchar', length: 255, nullable: true })
  employer?: string;

  @ApiProperty({ example: 1, description: 'Приоритет контакта', default: 1 })
  @Column({ type: 'int', default: 1 })
  contactPriority: number;
}
