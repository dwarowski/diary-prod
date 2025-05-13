import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { HomeworkService } from './homework.service';
import { CreateHomeworkDto } from './dtos/create-homework.dto';
import { UpdateHomeworkDto } from './dtos/update-homework.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Homework } from './entities/homework.entity';

@ApiTags('homework')
@Controller('homework')
export class HomeworkController {
  constructor(private readonly homeworkService: HomeworkService) {}

  @Post()
  @ApiOperation({ summary: 'Создать домашнее задание' })
  @ApiResponse({
    status: 201,
    description: 'Домашнее задание создано',
    type: Homework,
  })
  async create(
    @Body() createHomeworkDto: CreateHomeworkDto,
  ): Promise<Homework> {
    return this.homeworkService.create(createHomeworkDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список домашних заданий' })
  async findAll(): Promise<Homework[]> {
    return this.homeworkService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить домашнее задание по ID' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Homework> {
    return this.homeworkService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить домашнее задание' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateHomeworkDto: UpdateHomeworkDto,
  ): Promise<Homework> {
    return this.homeworkService.update(id, updateHomeworkDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить домашнее задание' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.homeworkService.remove(id);
  }
}
