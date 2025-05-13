import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { EventParticipant } from './event-participants.entity';

@Entity('Events')
export class Event {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор события' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Школьный концерт', description: 'Название события' })
  @Column({ length: 255 })
  eventName: string;

  @ApiProperty({
    example: 'Концерт учеников старших классов',
    description: 'Описание события',
    required: false,
  })
  @Column({ type: 'varchar', length: 1024, nullable: true })
  description?: string;

  @ApiProperty({
    example: '2025-04-20',
    description: 'Дата проведения события',
  })
  @Column({ type: 'date' })
  eventDate: string;

  @ApiProperty({ example: 1, description: 'ID организатора события' })
  @Column()
  organizerId: number;

  @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'organizerId' })
  organizer: User;

  @OneToMany(() => EventParticipant, (participant) => participant.event)
  participants: EventParticipant[];
}
