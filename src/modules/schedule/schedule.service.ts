import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from './entities/schedule.entity';
import { CreateScheduleDto } from './dtos/create-schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  async create(createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    const schedule = this.scheduleRepository.create(createScheduleDto);
    return this.scheduleRepository.save(schedule);
  }

  async findAll(): Promise<Schedule[]> {
    return this.scheduleRepository.find({
      relations: ['class', 'subject'],
    });
  }

  async findByDateAndClassId(
    date: Date,
    classId: number,
  ): Promise<Schedule | null> {
    return this.scheduleRepository.findOne({
      where: {
        date: date,
        classId: classId,
      },
      relations: ['class', 'subject'], // Optionally load related entities
    });
  }

  async remove(id: number): Promise<void> {
    const result = await this.scheduleRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Schedule with id ${id} not found.`);
    }
  }
}
