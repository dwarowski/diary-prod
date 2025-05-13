import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './entities/note.entity';
import { CreateNoteDto } from './dtos/create-note.dto';

@Injectable()
export class CommunicationService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
  ) {}

  // Методы для работы с сообщениями

  async createMessage(createMessageDto: CreateNoteDto): Promise<Note> {
    const message = this.noteRepository.create(createMessageDto);
    return this.noteRepository.save(message);
  }

  async markAsChecked(id: number): Promise<Note> {
    const note = await this.noteRepository.findOneBy({ id });

    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }

    note.checked = !note.checked; // Переключает состояние checked // Или false, если нужно переключить состояние
    return this.noteRepository.save(note);
  }

  async findAllMessages(): Promise<Note[]> {
    return this.noteRepository.find();
  }
}
