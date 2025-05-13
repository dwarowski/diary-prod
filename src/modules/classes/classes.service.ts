import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SchoolClass } from './entities/class.entity';
import { CreateClassDto } from './dtos/create-class.dto';
import { UpdateClassDto } from './dtos/update-class.dto';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(SchoolClass)
    private readonly classesRepository: Repository<SchoolClass>,
  ) {}

  async create(createClassDto: CreateClassDto): Promise<SchoolClass> {
    const schoolClass = this.classesRepository.create(createClassDto);
    return this.classesRepository.save(schoolClass);
  }

  async findAll(): Promise<SchoolClass[]> {
    return this.classesRepository.find({
      relations: ['classTeacher', 'students', 'subjects'],
    });
  }

  async findOne(id: number): Promise<SchoolClass> {
    const schoolClass = await this.classesRepository.findOne({
      where: { id },
      relations: ['classTeacher', 'students', 'subjects'],
    });
    if (!schoolClass) {
      throw new NotFoundException(`Class with id ${id} not found.`);
    }
    return schoolClass;
  }

  async update(
    id: number,
    updateClassDto: UpdateClassDto,
  ): Promise<SchoolClass> {
    const schoolClass = await this.findOne(id);
    Object.assign(schoolClass, updateClassDto);
    return this.classesRepository.save(schoolClass);
  }

  async remove(id: number): Promise<void> {
    const result = await this.classesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Class with id ${id} not found.`);
    }
  }
}
