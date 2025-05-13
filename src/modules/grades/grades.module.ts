import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grade } from './entities/grade.entity';
import { GradeHistory } from './entities/grade-history.entity';
import { GradesService } from './grades.service';
import { GradesController } from './grades.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Grade, GradeHistory])],
  providers: [GradesService],
  controllers: [],
  exports: [GradesService],
})
export class GradesModule {}
