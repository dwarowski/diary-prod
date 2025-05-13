import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateParentDto {
  @ApiPropertyOptional({
    example: 'ООО Рога и Копыта',
    description: 'Место работы родителя',
  })
  @IsOptional()
  @IsString()
  readonly employer?: string;

  @ApiPropertyOptional({
    example: 1,
    description: 'Приоритет контакта',
    default: 1,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  readonly contactPriority?: number;
}
