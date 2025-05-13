import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { SchoolClass } from 'src/modules/classes/entities/class.entity';

@Entity()
export class Student {
  @ApiProperty({ example: 1, description: 'ID пользователя (ученик)' })
  @PrimaryColumn()
  userId: number;

  // Связь с пользователем
  @ManyToOne(() => User, { cascade: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ApiProperty({ example: '2005-05-10', description: 'Дата рождения ученика' })
  @Column({ type: 'date' })
  birthDate: Date;

  @ApiProperty({
    example: 'г. Москва, ул. Ленина, д. 1',
    description: 'Адрес ученика',
    required: false,
  })
  @Column({ type: 'varchar', length: 255, nullable: true })
  address?: string;

  @ApiProperty({
    example: '+7 (123) 456-78-90',
    description: 'Телефон ученика',
    required: false,
  })
  @Column({ type: 'varchar', length: 20, nullable: true })
  phone?: string;

  // Ленивое отношение для избежания циклической зависимости:
  @ManyToOne(() => SchoolClass, (schoolClass) => schoolClass.students, {
    nullable: true,
    lazy: true,
  })
  @JoinColumn({ name: 'classId' })
  schoolClass?: Promise<SchoolClass>;
}
