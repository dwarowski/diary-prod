import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Homework } from './entities/homework.entity';
import { CreateHomeworkDto } from './dtos/create-homework.dto';
import { UpdateHomeworkDto } from './dtos/update-homework.dto';

@Injectable()
export class HomeworkService {
  constructor(
    @InjectRepository(Homework)
    private readonly homeworkRepository: Repository<Homework>,
  ) {}

  async create(createHomeworkDto: CreateHomeworkDto): Promise<Homework> {
    const homework = this.homeworkRepository.create(createHomeworkDto);
    return this.homeworkRepository.save(homework);
  }

  async findAll(): Promise<Homework[]> {
    return this.homeworkRepository.find({
      relations: ['subject', 'class', 'teacher'],
    });
  }

  async findOne(id: number): Promise<Homework> {
    const homework = await this.homeworkRepository.findOne({
      where: { id },
      relations: ['subject', 'class', 'teacher'],
    });
    if (!homework) {
      throw new NotFoundException(`Homework with id ${id} not found.`);
    }
    return homework;
  }

  async update(
    id: number,
    updateHomeworkDto: UpdateHomeworkDto,
  ): Promise<Homework> {
    const homework = await this.findOne(id);
    Object.assign(homework, updateHomeworkDto);
    return this.homeworkRepository.save(homework);
  }

  async remove(id: number): Promise<void> {
    const result = await this.homeworkRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Homework with id ${id} not found.`);
    }
  }
}
