import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { SchoolClass } from 'src/modules/classes/entities/class.entity';

@Entity()
export class User {
  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор пользователя',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Иван', description: 'Имя пользователя' })
  @Column({ length: 255 })
  firstName: string;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия пользователя' })
  @Column({ length: 255 })
  middleName: string;

  @ApiProperty({ example: 'Иванович', description: 'Отчество пользователя' })
  @Column({ length: 255 })
  lastName: string;

  @ApiProperty({ description: ' пользователя' })
  @Column({ type: 'timestamp' })
  dateOfBirth: Date;

  @ManyToOne(() => SchoolClass, (schoolClass) => schoolClass.students, {
    nullable: true,
    lazy: true,
    eager: true,
  })
  @JoinColumn({ name: 'classId' })
  schoolClass?: SchoolClass;

  @ApiProperty({
    example: 'ivanov@example.com',
    description: 'Email пользователя',
  })
  @Column({ length: 255, unique: true })
  email: string;

  @ApiProperty({
    example: 'hashpassword',
    description: 'Хэш пароля пользователя',
  })
  @Column({ type: 'char', length: 64 })
  password: string;

  @ApiProperty({ description: 'Дата создания пользователя' })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
