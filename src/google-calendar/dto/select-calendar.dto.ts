import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class SelectCalendarDto {
  @IsString()
  @IsNotEmpty()
  calendarId!: string;

  @IsOptional()
  @IsString()
  calendarName?: string;

  @IsOptional()
  @IsUUID()
  defaultStudioId?: string;
}
