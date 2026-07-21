import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SelectCalendarDto {
  @IsString()
  @IsNotEmpty()
  calendarId!: string;

  @IsOptional()
  @IsString()
  calendarName?: string;
}
