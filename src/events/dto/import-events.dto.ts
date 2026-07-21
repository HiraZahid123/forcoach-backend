import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class ImportEventRowDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsDateString()
  startTime!: string;

  @IsDateString()
  endTime!: string;

  @IsOptional()
  @IsUUID()
  studioId?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class ImportEventsDto {
  @IsIn(['csv'])
  source!: 'csv';

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ImportEventRowDto)
  rows!: ImportEventRowDto[];
}
