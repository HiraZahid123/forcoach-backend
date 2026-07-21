import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import type {
  TablesInsert,
  TablesUpdate,
} from '../supabase/types/database.types';

type EventInsert = TablesInsert<'events'>;
type EventUpdate = TablesUpdate<'events'>;

function toInsertRow(dto: CreateEventDto, userId: string): EventInsert {
  return {
    user_id: userId,
    title: dto.title,
    description: dto.description,
    location: dto.location,
    start_time: dto.startTime,
    end_time: dto.endTime,
    source: dto.source ?? 'manual',
    studio_id: dto.studioId,
    status: dto.status ?? 'unassigned',
    external_id: dto.externalId,
    notes: dto.notes,
  };
}

function toUpdateRow(dto: UpdateEventDto): EventUpdate {
  const row: EventUpdate = {};
  if (dto.title !== undefined) row.title = dto.title;
  if (dto.description !== undefined) row.description = dto.description;
  if (dto.location !== undefined) row.location = dto.location;
  if (dto.startTime !== undefined) row.start_time = dto.startTime;
  if (dto.endTime !== undefined) row.end_time = dto.endTime;
  if (dto.source !== undefined) row.source = dto.source;
  if (dto.studioId !== undefined) row.studio_id = dto.studioId;
  if (dto.status !== undefined) row.status = dto.status;
  if (dto.externalId !== undefined) row.external_id = dto.externalId;
  if (dto.notes !== undefined) row.notes = dto.notes;
  return row;
}

@Injectable()
export class EventsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async findAll(userId: string) {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('events')
      .select('*')
      .eq('user_id', userId)
      .order('start_time', { ascending: true });

    if (error) throw error;
    return data;
  }

  async create(userId: string, dto: CreateEventDto) {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('events')
      .insert(toInsertRow(dto, userId))
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(userId: string, id: string, dto: UpdateEventDto) {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('events')
      .update(toUpdateRow(dto))
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .maybeSingle();

    if (error) throw error;
    if (!data) throw new NotFoundException('Event not found');
    return data;
  }

  async remove(userId: string, id: string) {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('events')
      .delete()
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .maybeSingle();

    if (error) throw error;
    if (!data) throw new NotFoundException('Event not found');
    return { success: true };
  }
}
