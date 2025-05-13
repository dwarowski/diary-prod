import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { EventParticipant } from './entities/event-participants.entity';
import { CreateEventDto } from './dtos/create-event.dto';
import { UpdateEventDto } from './dtos/update-event.dto';
import { CreateEventParticipantDto } from './dtos/create-event-participant.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(EventParticipant)
    private readonly eventParticipantRepository: Repository<EventParticipant>,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const event = this.eventRepository.create(createEventDto);
    return this.eventRepository.save(event);
  }

  async findAll(): Promise<Event[]> {
    return this.eventRepository.find({
      relations: ['organizer', 'participants', 'participants.user'],
    });
  }

  async findOne(id: number): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: ['organizer', 'participants', 'participants.user'],
    });
    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found.`);
    }
    return event;
  }

  async update(id: number, updateEventDto: UpdateEventDto): Promise<Event> {
    const event = await this.findOne(id);
    Object.assign(event, updateEventDto);
    return this.eventRepository.save(event);
  }

  async remove(id: number): Promise<void> {
    const result = await this.eventRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Event with id ${id} not found.`);
    }
  }

  async addParticipant(
    createEventParticipantDto: CreateEventParticipantDto,
  ): Promise<EventParticipant> {
    // Проверка существования события
    await this.findOne(createEventParticipantDto.eventId);
    const participant = this.eventParticipantRepository.create(
      createEventParticipantDto,
    );
    return this.eventParticipantRepository.save(participant);
  }

  async removeParticipant(eventId: number, userId: number): Promise<void> {
    const result = await this.eventParticipantRepository.delete({
      eventId,
      userId,
    });
    if (result.affected === 0) {
      throw new NotFoundException(
        `Participant with eventId ${eventId} and userId ${userId} not found.`,
      );
    }
  }
}
