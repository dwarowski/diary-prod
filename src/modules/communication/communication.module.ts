import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { CommunicationService } from './communication.service';
import { CommunicationController } from './communication.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Note])],
  providers: [CommunicationService],
  controllers: [CommunicationController],
  exports: [CommunicationService],
})
export class CommunicationModule {}
