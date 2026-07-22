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
      'hassanjamal8735@gmail.com',
    );
    await this.mailService.send(
      adminEmail,
      'New FORCOACH signup',
      `A new coach just registered: ${dto.email}\n\nIf Google Calendar is still in Testing mode, add this email as a test user in Google Cloud Console before they try to connect their calendar.`,
    );
    return { success: true };
  }
}
