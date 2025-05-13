import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from './entities/teacher.entity';
import { CreateTeacherDto } from './dtos/create-teacher.dto';
import { UpdateTeacherDto } from './dtos/update-teacher.dto';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) {}

  async create(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    const teacher = this.teacherRepository.create(createTeacherDto);
    return this.teacherRepository.save(teacher);
  }

  async findAll(): Promise<Teacher[]> {
    return this.teacherRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Teacher> {
    const teacher = await this.teacherRepository.findOne({
      where: { userId: id },
      relations: ['user'],
    });
    if (!teacher) {
      throw new NotFoundException(`Teacher with id ${id} not found.`);
    }
    return teacher;
  }

  async update(
    id: number,
    updateTeacherDto: UpdateTeacherDto,
  ): Promise<Teacher> {
    const teacher = await this.findOne(id);
    Object.assign(teacher, updateTeacherDto);
    return this.teacherRepository.save(teacher);
  }

  async remove(id: number): Promise<void> {
    const result = await this.teacherRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Teacher with id ${id} not found.`);
    }
  }
}
