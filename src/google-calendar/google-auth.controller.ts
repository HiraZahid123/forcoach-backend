import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Response } from 'express';
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard';
import type { AuthenticatedRequest } from '../auth/supabase-auth.guard';
import { GoogleCalendarService } from './google-calendar.service';

@Controller('auth/google')
export class GoogleAuthController {
  constructor(
    private readonly googleCalendarService: GoogleCalendarService,
    private readonly config: ConfigService,
  ) {}

  @Get('connect')
  @UseGuards(SupabaseAuthGuard)
  connect(@Req() request: AuthenticatedRequest) {
    return { url: this.googleCalendarService.buildAuthUrl(request.user.id) };
  }

  @Get('callback')
  async callback(
    @Query('code') code: string | undefined,
    @Query('state') state: string | undefined,
    @Query('error') error: string | undefined,
    @Res() res: Response,
  ) {
    const webOrigin =
      this.config.get<string>('WEB_ORIGIN') ?? 'http://localhost:3000';

    if (error || !code || !state) {
      return res.redirect(`${webOrigin}/calendar?google=error`);
    }

    try {
      await this.googleCalendarService.handleCallback(code, state);
      return res.redirect(`${webOrigin}/calendar?google=connected`);
    } catch {
      return res.redirect(`${webOrigin}/calendar?google=error`);
    }
  }
}
