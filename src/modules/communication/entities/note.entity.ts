import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('Note')
export class Note {
  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Привет, как дела?', description: 'Текст' })
  @Column({ type: 'varchar', length: 1024 })
  label: string;

  @ApiProperty({ example: false, description: 'Флаг' })
  @Column({ default: false })
  checked: boolean;
}
