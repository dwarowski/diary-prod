import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ParentsService } from './parents.service';
import { CreateParentDto } from './dtos/create-parent.dto';
import { UpdateParentDto } from './dtos/update-parent.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Parent } from './entities/parent.entity';

@ApiTags('parents')
@Controller('parents')
export class ParentsController {
  constructor(private readonly parentsService: ParentsService) {}

  @Post()
  @ApiOperation({ summary: 'Создать запись родителя' })
  @ApiResponse({ status: 201, description: 'Родитель создан', type: Parent })
  async create(@Body() createParentDto: CreateParentDto): Promise<Parent> {
    return this.parentsService.create(createParentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список родителей' })
  async findAll(): Promise<Parent[]> {
    return this.parentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить информацию о конкретном родителе' })
  async findOne(@Param('id') id: number): Promise<Parent> {
    return this.parentsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить данные родителя' })
  async update(
    @Param('id') id: number,
    @Body() updateParentDto: UpdateParentDto,
  ): Promise<Parent> {
    return this.parentsService.update(id, updateParentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить запись родителя' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.parentsService.remove(id);
  }
}
