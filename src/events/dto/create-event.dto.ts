import {
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsDateString()
  startTime!: string;

  @IsDateString()
  endTime!: string;

  @IsOptional()
  @IsIn(['google_calendar', 'csv', 'manual'])
  source?: 'google_calendar' | 'csv' | 'manual';

  @IsOptional()
  @IsUUID()
  studioId?: string;

  @IsOptional()
  @IsIn(['assigned', 'unassigned', 'excluded'])
  status?: 'assigned' | 'unassigned' | 'excluded';

  @IsOptional()
  @IsString()
  externalId?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
