import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SupabaseService } from '../supabase/supabase.service';
import { GoogleCalendarService } from './google-calendar.service';

@Injectable()
export class GoogleCalendarSyncScheduler {
  private readonly logger = new Logger(GoogleCalendarSyncScheduler.name);

  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly googleCalendarService: GoogleCalendarService,
  ) {}

  @Cron(CronExpression.EVERY_6_HOURS)
  async syncAllConnectedCalendars() {
    const { data: connections, error } = await this.supabaseService
      .getClient()
      .from('calendar_connections')
      .select('user_id')
      .eq('provider', 'google')
      .not('calendar_id', 'is', null);

    if (error) {
      this.logger.error(
        `Failed to list calendar connections: ${error.message}`,
      );
      return;
    }

    this.logger.log(
      `Starting scheduled sync for ${connections.length} connected calendar(s)`,
    );

    for (const { user_id } of connections) {
      try {
        const result = await this.googleCalendarService.sync(user_id);
        this.logger.log(
          `Synced user ${user_id}: ${result.created} new, ${result.updated} updated`,
        );
      } catch (err) {
        this.logger.error(
          `Sync failed for user ${user_id}: ${err instanceof Error ? err.message : err}`,
        );
      }
    }
  }
}
