import { Injectable, Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DRIZZLE } from '@/database/database.module';
import type { DrizzleDB } from '@/database/database.module';
import { admins } from '@/database/schemas';

@Injectable()
export class AuthService {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDB) {}

  async validateAdmin(userId: string): Promise<boolean> {
    const adminRecord = await this.db
      .select({ id: admins.id })
      .from(admins)
      .where(eq(admins.user_id, userId))
      .limit(1);

    return adminRecord.length > 0;
  }
}
