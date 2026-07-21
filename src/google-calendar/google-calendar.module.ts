import { Module } from '@nestjs/common';
import { SupabaseModule } from '../supabase/supabase.module';
import { AuthModule } from '../auth/auth.module';
import { GoogleAuthController } from './google-auth.controller';
import { GoogleCalendarController } from './google-calendar.controller';
import { GoogleCalendarService } from './google-calendar.service';
import { GoogleOAuthStateService } from './google-oauth-state.service';

@Module({
  imports: [SupabaseModule, AuthModule],
  controllers: [GoogleAuthController, GoogleCalendarController],
  providers: [GoogleCalendarService, GoogleOAuthStateService],
})
export class GoogleCalendarModule {}
