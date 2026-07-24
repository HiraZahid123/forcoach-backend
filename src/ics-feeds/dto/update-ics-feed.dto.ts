import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
  ValidateIf,
} from 'class-validator';

export class UpdateIcsFeedDto {
  @IsOptional()
  @IsUrl({ protocols: ['http', 'https'], require_protocol: true })
  url?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @ValidateIf((o: UpdateIcsFeedDto) => o.defaultStudioId !== null)
  @IsUUID()
  defaultStudioId?: string | null;
}
