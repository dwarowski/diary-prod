import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dtos/create-student.dto';
import { UpdateStudentDto } from './dtos/update-student.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Student } from './entities/student.entity';

@ApiTags('students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @ApiOperation({ summary: 'Создать ученика' })
  @ApiResponse({ status: 201, description: 'Ученик создан', type: Student })
  async create(@Body() createStudentDto: CreateStudentDto): Promise<Student> {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список учеников' })
  async findAll(): Promise<Student[]> {
    return this.studentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить информацию о конкретном ученике' })
  async findOne(@Param('id') id: number): Promise<Student> {
    return this.studentsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить данные ученика' })
  async update(
    @Param('id') id: number,
    @Body() updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    return this.studentsService.update(id, updateStudentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить ученика' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.studentsService.remove(id);
  }
}
