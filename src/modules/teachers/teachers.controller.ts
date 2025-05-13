import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dtos/create-teacher.dto';
import { UpdateTeacherDto } from './dtos/update-teacher.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Teacher } from './entities/teacher.entity';

@ApiTags('teachers')
@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Post()
  @ApiOperation({ summary: 'Создать запись учителя' })
  @ApiResponse({ status: 201, description: 'Учитель создан', type: Teacher })
  async create(@Body() createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    return this.teachersService.create(createTeacherDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список учителей' })
  async findAll(): Promise<Teacher[]> {
    return this.teachersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить информацию о конкретном учителе' })
  async findOne(@Param('id') id: number): Promise<Teacher> {
    return this.teachersService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить информацию о учителе' })
  async update(
    @Param('id') id: number,
    @Body() updateTeacherDto: UpdateTeacherDto,
  ): Promise<Teacher> {
    return this.teachersService.update(id, updateTeacherDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить запись учителя' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.teachersService.remove(id);
  }
}
