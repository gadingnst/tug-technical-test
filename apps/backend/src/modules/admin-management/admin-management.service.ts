import {
  Injectable,
  Inject,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { auth } from '@/modules/auth/auth.provider';
import { DRIZZLE } from '@/database/database.module';
import type { DrizzleDB } from '@/database/database.module';
import { admins, user } from '@/database/schemas';
import { eq } from 'drizzle-orm';

@Injectable()
export class AdminManagementService {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDB) {}

  async listAdmins() {
    return this.db
      .select({
        id: admins.id,
        user_id: admins.user_id,
        email: user.email,
        created_at: admins.created_at,
      })
      .from(admins)
      .innerJoin(user, eq(admins.user_id, user.id));
  }

  async addAdmin(email: string) {
    // Check if email already exists
    const existingUser = await this.db
      .select()
      .from(user)
      .where(eq(user.email, email))
      .limit(1);
    if (existingUser.length > 0) {
      throw new BadRequestException('Email already exists');
    }

    // Generate a secure random password length 16
    const password =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);

    try {
      // 1. Create User in Better Auth
      const newUser = await auth.api.createUser({
        body: {
          email,
          password,
          name: email.split('@')[0],
          role: 'admin',
        },
      });

      // 2. Insert into admins table
      const insertResult = await this.db
        .insert(admins)
        .values({
          user_id: newUser.user.id,
        })
        .returning();

      return {
        admin: insertResult[0],
        generatedPassword: password,
      };
    } catch (e: unknown) {
      const err = e as Error;
      throw new InternalServerErrorException(
        `Failed to add admin: ${err.message}`,
      );
    }
  }

  async deleteAdmin(adminId: number, currentUserId?: string) {
    // 1. Find the admin record to get the user_id
    const adminRecord = await this.db
      .select()
      .from(admins)
      .where(eq(admins.id, adminId))
      .limit(1);

    if (adminRecord.length === 0) {
      throw new BadRequestException('Admin not found');
    }

    const targetUserId = adminRecord[0].user_id;

    // 2. Prevent self deletion
    if (currentUserId && currentUserId === targetUserId) {
      throw new BadRequestException('You cannot delete your own admin account');
    }

    try {
      // 3. Delete user from the database.
      // Because `admins.user_id` has `onDelete: 'cascade'`, it will automatically be removed from the `admins` table too.
      await this.db.delete(user).where(eq(user.id, targetUserId));

      return {
        message: 'Admin deleted successfully',
      };
    } catch (e: unknown) {
      const err = e as Error;
      throw new InternalServerErrorException(
        `Failed to delete admin: ${err.message}`,
      );
    }
  }

  async upgradeUser(userId: string, headers: Headers) {
    try {
      // 1. Set user role in better auth
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      await auth.api.setRole({
        body: {
          userId,
          role: 'admin',
        },
        headers: headers,
      } as any);

      // 2. Verify if it already exists in admins table to be idempotent
      const existing = await this.db
        .select()
        .from(admins)
        .where(eq(admins.user_id, userId))
        .limit(1);

      let adminRecord;
      if (existing.length === 0) {
        const insertResult = await this.db
          .insert(admins)
          .values({
            user_id: userId,
          })
          .returning();
        adminRecord = insertResult[0];
      } else {
        adminRecord = existing[0];
      }

      return adminRecord;
    } catch (e: unknown) {
      const err = e as Error;
      throw new InternalServerErrorException(
        `Failed to upgrade user: ${err.message}`,
      );
    }
  }
}
