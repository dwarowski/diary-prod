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
import { GradesService } from './grades.service';
import { CreateGradeDto } from './dtos/create-grade.dto';
import { UpdateGradeDto } from './dtos/update-grade.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Grade } from './entities/grade.entity';

@ApiTags('grades')
@Controller('grades')
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}

  @Post()
  @ApiOperation({ summary: 'Создать оценку' })
  @ApiResponse({ status: 201, description: 'Оценка создана', type: Grade })
  async create(@Body() createGradeDto: CreateGradeDto): Promise<Grade> {
    return this.gradesService.create(createGradeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список оценок' })
  async findAll(): Promise<Grade[]> {
    return this.gradesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить информацию об оценке по ID' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Grade> {
    return this.gradesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить оценку' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGradeDto: UpdateGradeDto,
  ): Promise<Grade> {
    // Здесь можно добавить получение ID текущего пользователя для changedBy
    const changedBy = undefined;
    return this.gradesService.update(id, updateGradeDto, changedBy);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить оценку' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.gradesService.remove(id);
  }
}
