import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TeachersModule } from './modules/teachers/teachers.module';
import { ClassesModule } from './modules/classes/classes.module';
import { ParentsModule } from './modules/parents/parents.module';
import { SubjectsModule } from './modules/subjects/subjects.module';
import { GradesModule } from './modules/grades/grades.module';
import { ScheduleModule } from './modules/schedule/schedule.module';
import { StudentsModule } from './modules/students/students.module';
import { AttendanceModule } from './modules/attendance/attendance.module';
import { CommunicationModule } from './modules/communication/communication.module';
import { EventsModule } from './modules/events/events.module';

@Module({
  imports: [
    UsersModule,
    TeachersModule,
    ClassesModule,
    ClassesModule,
    ParentsModule,
    SubjectsModule,
    GradesModule,
    ScheduleModule,
    StudentsModule,
    AttendanceModule,
    CommunicationModule,
    EventsModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: configService.get('NODE_ENV') !== 'production',
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
})
export class AppModule {}
