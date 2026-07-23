import { ArrayMinSize, IsArray, IsUUID } from 'class-validator';

export class BulkDeleteEventsDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsUUID('4', { each: true })
  ids!: string[];
}
