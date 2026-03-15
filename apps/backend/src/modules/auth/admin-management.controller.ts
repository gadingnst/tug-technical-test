import {
  Controller,
  Post,
  Get,
  Req,
  Body,
  UseGuards,
  BadRequestException,
  InternalServerErrorException,
  Delete,
  Param,
} from '@nestjs/common';
import { auth } from '@/modules/auth/auth.provider';
import { AdminAuthGuard } from '@/guards/admin-auth.guard';
import { Inject } from '@nestjs/common';
import { DRIZZLE } from '@/database/database.module';
import type { DrizzleDB } from '@/database/database.module';
import { admins, user } from '@/database/schemas';
import { AddAdminSchema, UpgradeAdminSchema } from '@wellness/shared-typescript';
import { eq } from 'drizzle-orm';

@Controller('admin/admins')
@UseGuards(AdminAuthGuard)
export class AdminManagementController {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDB) { }

  @Get()
  async listAdmins() {
    const adminList = await this.db
      .select({
        id: admins.id,
        user_id: admins.user_id,
        email: user.email,
        created_at: admins.created_at,
      })
      .from(admins)
      .innerJoin(user, eq(admins.user_id, user.id));

    return adminList;
  }

  @Post()
  async addAdmin(@Body() body: unknown) {
    const parsed = AddAdminSchema.safeParse(body);
    if (!parsed.success) {
      throw new BadRequestException(parsed.error.flatten());
    }

    const { email } = parsed.data;

    // Check if email already exists
    const existingUser = await this.db.select().from(user).where(eq(user.email, email)).limit(1);
    if (existingUser.length > 0) {
      throw new BadRequestException('Email already exists');
    }

    // Generate a secure random password length 16
    const password = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);

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
      const insertResult = await this.db.insert(admins).values({
        user_id: newUser.user.id,
      }).returning();

      return {
        admin: insertResult[0],
        generatedPassword: password,
      };
    } catch (e: unknown) {
      const err = e as Error;
      throw new InternalServerErrorException(`Failed to add admin: ${err.message}`);
    }
  }

  @Delete(':id')
  async deleteAdmin(@Param('id') id: string, @Req() req: Request & { user?: { id: string } }) {
    const adminId = parseInt(id, 10);
    if (isNaN(adminId)) {
      throw new BadRequestException('Invalid admin ID');
    }

    // 1. Find the admin record to get the user_id
    const adminRecord = await this.db.select().from(admins).where(eq(admins.id, adminId)).limit(1);
    
    if (adminRecord.length === 0) {
      throw new BadRequestException('Admin not found');
    }

    const targetUserId = adminRecord[0].user_id;

    // 2. Prevent self deletion
    if (req.user && req.user.id === targetUserId) {
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
      throw new InternalServerErrorException(`Failed to delete admin: ${err.message}`);
    }
  }

  @Post('upgrade')
  async upgradeUser(@Body() body: unknown, @Req() request: Request) {
    const parsed = UpgradeAdminSchema.safeParse(body);
    if (!parsed.success) {
      throw new BadRequestException(parsed.error.flatten());
    }

    const { userId } = parsed.data;

    try {
      const headers = new Headers();
      Object.entries(request.headers).forEach(([key, value]) => {
        if (typeof value === 'string') headers.append(key, value);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        else if (Array.isArray(value)) value.forEach((v) => headers.append(key, v));
      });

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
      const existing = await this.db.select().from(admins).where(eq(admins.user_id, userId)).limit(1);

      let adminRecord;
      if (existing.length === 0) {
        const insertResult = await this.db.insert(admins).values({
          user_id: userId,
        }).returning();
        adminRecord = insertResult[0];
      } else {
        adminRecord = existing[0];
      }

      return adminRecord;
    } catch (e: unknown) {
      const err = e as Error;
      throw new InternalServerErrorException(`Failed to upgrade user: ${err.message}`);
    }
  }
}
