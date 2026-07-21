import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

const STATE_TTL_MS = 10 * 60 * 1000;

@Injectable()
export class GoogleOAuthStateService {
  private readonly pending = new Map<
    string,
    { userId: string; expiresAt: number }
  >();

  create(userId: string): string {
    const nonce = randomUUID();
    this.pending.set(nonce, { userId, expiresAt: Date.now() + STATE_TTL_MS });
    return nonce;
  }

  consume(nonce: string): string | null {
    const entry = this.pending.get(nonce);
    this.pending.delete(nonce);
    if (!entry || entry.expiresAt < Date.now()) return null;
    return entry.userId;
  }
}
