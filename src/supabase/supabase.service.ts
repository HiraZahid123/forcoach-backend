import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './types/database.types';

@Injectable()
export class SupabaseService {
  private readonly client: SupabaseClient<Database>;

  constructor(private readonly config: ConfigService) {
    this.client = createClient<Database>(
      this.config.getOrThrow<string>('SUPABASE_URL'),
      this.config.getOrThrow<string>('SUPABASE_SERVICE_ROLE_KEY'),
      { auth: { persistSession: false } },
    );
  }

  getClient(): SupabaseClient<Database> {
    return this.client;
  }
}
