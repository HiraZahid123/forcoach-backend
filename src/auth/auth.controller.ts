import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { SupabaseAuthGuard } from './supabase-auth.guard';
import type { AuthenticatedRequest } from './supabase-auth.guard';

@Controller('auth')
export class AuthController {
  @Get('me')
  @UseGuards(SupabaseAuthGuard)
  me(@Req() request: AuthenticatedRequest) {
    return { user: request.user };
  }
}
