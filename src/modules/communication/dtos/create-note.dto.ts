import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteDto {
  @ApiProperty({ example: 'Привет, как дела?', description: 'Текст сообщения' })
  @IsNotEmpty()
  @IsString()
  readonly label: string;
}
