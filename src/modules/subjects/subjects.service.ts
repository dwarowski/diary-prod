import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from './entities/subject.entity';
import { CreateSubjectDto } from './dtos/create-subject.dto';
import { UpdateSubjectDto } from './dtos/update-subject.dto';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectsRepository: Repository<Subject>,
  ) {}

  async create(createSubjectDto: CreateSubjectDto): Promise<Subject> {
    const subject = this.subjectsRepository.create(createSubjectDto);
    return this.subjectsRepository.save(subject);
  }

  async findAll(): Promise<Subject[]> {
    return this.subjectsRepository.find({ relations: ['classes'] });
  }

  async findOne(id: number): Promise<Subject> {
    const subject = await this.subjectsRepository.findOne({
      where: { id },
      relations: ['classes'],
    });
    if (!subject) {
      throw new NotFoundException(`Subject with id ${id} not found.`);
    }
    return subject;
  }

  async update(
    id: number,
    updateSubjectDto: UpdateSubjectDto,
  ): Promise<Subject> {
    const subject = await this.findOne(id);
    Object.assign(subject, updateSubjectDto);
    return this.subjectsRepository.save(subject);
  }

  async remove(id: number): Promise<void> {
    const result = await this.subjectsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Subject with id ${id} not found.`);
    }
  }
}
