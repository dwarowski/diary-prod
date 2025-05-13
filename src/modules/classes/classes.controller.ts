import { Controller, Post, Body } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dtos/create-class.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SchoolClass } from './entities/class.entity';

@ApiTags('classes')
@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Post()
  @ApiOperation({ summary: 'Создать класс' })
  @ApiResponse({ status: 201, description: 'Класс создан', type: SchoolClass })
  async create(@Body() createClassDto: CreateClassDto): Promise<SchoolClass> {
    return this.classesService.create(createClassDto);
  }
}
