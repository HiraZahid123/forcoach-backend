import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SupabaseService } from '../supabase/supabase.service';
import { IcsFeedsService } from './ics-feeds.service';

@Injectable()
export class IcsFeedsSyncScheduler {
  private readonly logger = new Logger(IcsFeedsSyncScheduler.name);

  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly icsFeedsService: IcsFeedsService,
  ) {}

  @Cron(CronExpression.EVERY_6_HOURS)
  async syncAllFeeds() {
    const { data: feeds, error } = await this.supabaseService
      .getClient()
      .from('ics_feeds')
      .select('id, user_id');

    if (error) {
      this.logger.error(`Failed to list ICS feeds: ${error.message}`);
      return;
    }

    this.logger.log(`Starting scheduled sync for ${feeds.length} ICS feed(s)`);

    for (const { id, user_id } of feeds) {
      try {
        const result = await this.icsFeedsService.sync(user_id, id);
        this.logger.log(
          `Synced feed ${id} for user ${user_id}: ${result.created} new, ${result.updated} updated`,
        );
      } catch (err) {
        this.logger.error(
          `Sync failed for feed ${id} (user ${user_id}): ${err instanceof Error ? err.message : err}`,
        );
      }
    }
  }
}
