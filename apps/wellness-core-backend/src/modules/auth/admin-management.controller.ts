import {
  Controller,
  Post,
  Get,
  Req,
  Body,
  UseGuards,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { auth } from '@/modules/auth/auth.provider';
import { AdminAuthGuard } from '@/guards/admin-auth.guard';
import { Inject } from '@nestjs/common';
import { DRIZZLE } from '@/database/database.module';
import type { DrizzleDB } from '@/database/database.module';
import { admins } from '@/database/schemas';
import { AddAdminSchema, UpgradeAdminSchema } from '@wellness/shared-typescript';
import { eq } from 'drizzle-orm';

@Controller('admin/admins')
@UseGuards(AdminAuthGuard)
export class AdminManagementController {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDB) {}

  @Get()
  async listAdmins() {
    const adminList = await this.db.select().from(admins);
    return { data: adminList };
  }

  @Post()
  async addAdmin(@Body() body: unknown) {
    const parsed = AddAdminSchema.safeParse(body);
    if (!parsed.success) {
      throw new BadRequestException(parsed.error.flatten());
    }

    const { email } = parsed.data;
    
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
        message: 'Admin added successfully',
        data: {
          admin: insertResult[0],
          generatedPassword: password, // For returning to the caller to give to the new admin
        },
      };
    } catch (e: unknown) {
      const err = e as Error;
      throw new InternalServerErrorException(`Failed to add admin: ${err.message}`);
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

      return {
        message: 'User upgraded to admin successfully',
        data: adminRecord,
      };
    } catch (e: unknown) {
      const err = e as Error;
      throw new InternalServerErrorException(`Failed to upgrade user: ${err.message}`);
    }
  }
}
