import { Body, Controller, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailService } from './mail.service';
import { NewSignupDto } from './dto/new-signup.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly mailService: MailService,
    private readonly config: ConfigService,
  ) {}

  @Post('new-signup')
  async newSignup(@Body() dto: NewSignupDto) {
    const adminEmail = this.config.get<string>(
      'ADMIN_NOTIFICATION_EMAIL',
      'contact@forcoach.io',
    );
    await this.mailService.send(
      adminEmail,
      'New FORCOACH signup',
      `A new coach just registered: ${dto.email}\n\n` +
        `While Google Calendar access is in Testing mode, this person needs to be added as a test user before they can connect their calendar:\n` +
        `https://console.cloud.google.com/auth/audience?project=for-503122&supportedpurview=project\n\n` +
        `Add "${dto.email}" under Test users, then they're good to go.`,
    );
    return { success: true };
  }
}
