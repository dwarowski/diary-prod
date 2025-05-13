import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { EventParticipant } from './entities/event-participants.entity';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Event, EventParticipant])],
  providers: [EventsService],
  controllers: [],
  exports: [EventsService],
})
export class EventsModule {}
