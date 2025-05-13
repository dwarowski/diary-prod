import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Event } from './event.entity';
import { User } from '../../users/entities/user.entity';

@Entity('EventParticipants')
export class EventParticipant {
  @ApiProperty({ example: 1, description: 'ID события' })
  @PrimaryColumn()
  eventId: number;

  @ApiProperty({ example: 2, description: 'ID участника (пользователя)' })
  @PrimaryColumn()
  userId: number;

  @ManyToOne(() => Event, (event) => event.participants, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'eventId' })
  event: Event;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;
}
