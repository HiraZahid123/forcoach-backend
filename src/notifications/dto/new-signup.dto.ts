import { IsEmail } from 'class-validator';

export class NewSignupDto {
  @IsEmail()
  email!: string;
}
