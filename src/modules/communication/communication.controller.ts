import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CommunicationService } from './communication.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Note } from './entities/note.entity';
import { CreateNoteDto } from './dtos/create-note.dto';

@ApiTags('Note')
@Controller('Note')
export class CommunicationController {
  constructor(private readonly noteService: CommunicationService) {}

  @Post()
  @ApiOperation({ summary: 'Создать заметка' })
  @ApiResponse({ status: 201, description: 'заметка создано', type: Note })
  async createMessage(@Body() createMessageDto: CreateNoteDto): Promise<Note> {
    return this.noteService.createMessage(createMessageDto);
  }

  @ApiOperation({ summary: 'Отметить заметку как выполненную' })
  @ApiParam({ name: 'id', type: Number, description: 'ID заметки' })
  @ApiResponse({
    status: 200,
    description: 'Заметка успешно обновлена.',
    type: Note,
  })
  @ApiResponse({ status: 404, description: 'Заметка не найдена.' })
  @Patch(':id/check')
  async markNoteAsChecked(@Param('id') id: number): Promise<Note> {
    try {
      return await this.noteService.markAsChecked(id);
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw e; // Или обработайте другие ошибки
    }
  }

  @Get()
  @ApiOperation({ summary: 'Получить список сообщений' })
  async findAllMessages(): Promise<Note[]> {
    return this.noteService.findAllMessages();
  }
}
