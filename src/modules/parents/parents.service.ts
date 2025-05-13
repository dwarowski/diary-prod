import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parent } from './entities/parent.entity';
import { CreateParentDto } from './dtos/create-parent.dto';
import { UpdateParentDto } from './dtos/update-parent.dto';

@Injectable()
export class ParentsService {
  constructor(
    @InjectRepository(Parent)
    private readonly parentRepository: Repository<Parent>,
  ) {}

  async create(createParentDto: CreateParentDto): Promise<Parent> {
    const parent = this.parentRepository.create(createParentDto);
    return this.parentRepository.save(parent);
  }

  async findAll(): Promise<Parent[]> {
    return this.parentRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Parent> {
    const parent = await this.parentRepository.findOne({
      where: { userId: id },
      relations: ['user'],
    });
    if (!parent) {
      throw new NotFoundException(`Parent with id ${id} not found.`);
    }
    return parent;
  }

  async update(id: number, updateParentDto: UpdateParentDto): Promise<Parent> {
    const parent = await this.findOne(id);
    Object.assign(parent, updateParentDto);
    return this.parentRepository.save(parent);
  }

  async remove(id: number): Promise<void> {
    const result = await this.parentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Parent with id ${id} not found.`);
    }
  }
}
