import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grade } from './entities/grade.entity';
import { GradeHistory } from './entities/grade-history.entity';
import { CreateGradeDto } from './dtos/create-grade.dto';
import { UpdateGradeDto } from './dtos/update-grade.dto';

@Injectable()
export class GradesService {
  constructor(
    @InjectRepository(Grade)
    private readonly gradeRepository: Repository<Grade>,
    @InjectRepository(GradeHistory)
    private readonly gradeHistoryRepository: Repository<GradeHistory>,
  ) {}

  async create(createGradeDto: CreateGradeDto): Promise<Grade> {
    const grade = this.gradeRepository.create(createGradeDto);
    return this.gradeRepository.save(grade);
  }

  async findAll(): Promise<Grade[]> {
    return this.gradeRepository.find({
      relations: ['student', 'subject', 'teacher'],
    });
  }

  async findOne(id: number): Promise<Grade> {
    const grade = await this.gradeRepository.findOne({
      where: { id },
      relations: ['student', 'subject', 'teacher'],
    });
    if (!grade) {
      throw new NotFoundException(`Grade with id ${id} not found.`);
    }
    return grade;
  }

  async update(
    id: number,
    updateGradeDto: UpdateGradeDto,
    changedBy?: number,
  ): Promise<Grade> {
    const existingGrade = await this.findOne(id);
    const oldGradeValue = existingGrade.grade; // сохраняем старое значение
    Object.assign(existingGrade, updateGradeDto);
    const updatedGrade = await this.gradeRepository.save(existingGrade);

    if (updateGradeDto.grade && updateGradeDto.grade !== oldGradeValue) {
      const historyEntry = this.gradeHistoryRepository.create({
        gradeId: id,
        oldGrade: oldGradeValue,
        newGrade: updateGradeDto.grade,
        changedBy: changedBy ?? undefined, // если changedBy не передан, используем undefined
      });
      await this.gradeHistoryRepository.save(historyEntry);
    }
    return updatedGrade;
  }

  async remove(id: number): Promise<void> {
    const result = await this.gradeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Grade with id ${id} not found.`);
    }
  }
}
