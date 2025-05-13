import { IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventParticipantDto {
  @ApiProperty({ example: 1, description: 'ID события' })
  @IsNotEmpty()
  @IsInt()
  readonly eventId: number;

  @ApiProperty({ example: 2, description: 'ID участника' })
  @IsNotEmpty()
  @IsInt()
  readonly userId: number;
}
