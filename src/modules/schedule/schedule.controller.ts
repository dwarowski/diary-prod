import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dtos/create-schedule.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Schedule } from './entities/schedule.entity';

@ApiTags('schedule')
@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  @ApiOperation({ summary: 'Создать запись расписания' })
  @ApiResponse({
    status: 201,
    description: 'Расписание создано',
    type: Schedule,
  })
  async create(
    @Body() createScheduleDto: CreateScheduleDto,
  ): Promise<Schedule> {
    return this.scheduleService.create(createScheduleDto);
  }

  @Get()
  async getSchedulesByDateAndClassId(
    @Query('date') date: string,
    @Query('classId') classId: number,
  ): Promise<Schedule | null> {
    try {
      const parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) {
        throw new Error(
          'Invalid date format. Please provide a valid date string.',
        );
      }

      if (!classId || isNaN(classId)) {
        throw new Error('Invalid classId. Please provide a valid number.');
      }

      return this.scheduleService.findByDateAndClassId(
        parsedDate,
        Number(classId),
      );
    } catch (error) {
      throw error; // Re-throw to let NestJS handle the exception, or return a custom error object.
      // Example of custom error response:
      // throw new BadRequestException(error.message); // Requires @nestjs/common import
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить запись расписания' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.scheduleService.remove(id);
  }
}
