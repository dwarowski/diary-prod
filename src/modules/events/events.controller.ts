import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dtos/create-event.dto';
import { UpdateEventDto } from './dtos/update-event.dto';
import { CreateEventParticipantDto } from './dtos/create-event-participant.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Event } from './entities/event.entity';
import { EventParticipant } from './entities/event-participants.entity';

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @ApiOperation({ summary: 'Создать событие' })
  @ApiResponse({ status: 201, description: 'Событие создано', type: Event })
  async create(@Body() createEventDto: CreateEventDto): Promise<Event> {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список событий' })
  async findAll(): Promise<Event[]> {
    return this.eventsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить событие по ID' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Event> {
    return this.eventsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить событие' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEventDto: UpdateEventDto,
  ): Promise<Event> {
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить событие' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.eventsService.remove(id);
  }

  // Эндпоинты для участников события

  @Post('participants')
  @ApiOperation({ summary: 'Добавить участника в событие' })
  @ApiResponse({
    status: 201,
    description: 'Участник добавлен',
    type: EventParticipant,
  })
  async addParticipant(
    @Body() createEventParticipantDto: CreateEventParticipantDto,
  ): Promise<EventParticipant> {
    return this.eventsService.addParticipant(createEventParticipantDto);
  }

  @Delete('participants')
  @ApiOperation({ summary: 'Удалить участника из события' })
  async removeParticipant(
    @Query('eventId', ParseIntPipe) eventId: number,
    @Query('userId', ParseIntPipe) userId: number,
  ): Promise<void> {
    return this.eventsService.removeParticipant(eventId, userId);
  }
}
