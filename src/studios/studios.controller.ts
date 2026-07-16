import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard';
import type { AuthenticatedRequest } from '../auth/supabase-auth.guard';
import { StudiosService } from './studios.service';
import { CreateStudioDto } from './dto/create-studio.dto';
import { UpdateStudioDto } from './dto/update-studio.dto';

@Controller('studios')
@UseGuards(SupabaseAuthGuard)
export class StudiosController {
  constructor(private readonly studiosService: StudiosService) {}

  @Get()
  findAll(@Req() request: AuthenticatedRequest) {
    return this.studiosService.findAll(request.user.id);
  }

  @Post()
  create(@Req() request: AuthenticatedRequest, @Body() dto: CreateStudioDto) {
    return this.studiosService.create(request.user.id, dto);
  }

  @Patch(':id')
  update(
    @Req() request: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() dto: UpdateStudioDto,
  ) {
    return this.studiosService.update(request.user.id, id, dto);
  }

  @Delete(':id')
  remove(@Req() request: AuthenticatedRequest, @Param('id') id: string) {
    return this.studiosService.remove(request.user.id, id);
  }
}
