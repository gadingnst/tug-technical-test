import {
  Controller,
  Post,
  Get,
  Req,
  Body,
  UseGuards,
  BadRequestException,
  Delete,
  Param,
} from '@nestjs/common';
import type { Request } from 'express';
import { AdminAuthGuard } from '@/guards/admin-auth.guard';
import { AddAdminSchema, UpgradeAdminSchema } from '@wellness/shared-typescript';
import { AdminManagementService } from './admin-management.service';

@Controller('admin/admins')
@UseGuards(AdminAuthGuard)
export class AdminManagementController {
  constructor(private readonly adminManagementService: AdminManagementService) { }

  @Get()
  async listAdmins() {
    return this.adminManagementService.listAdmins();
  }

  @Post()
  async addAdmin(@Body() body: unknown) {
    const parsed = AddAdminSchema.safeParse(body);
    if (!parsed.success) {
      throw new BadRequestException(parsed.error.flatten());
    }

    return this.adminManagementService.addAdmin(parsed.data.email);
  }

  @Delete(':id')
  async deleteAdmin(@Param('id') id: string, @Req() req: Request & { user?: { id: string } }) {
    const adminId = parseInt(id, 10);
    if (isNaN(adminId)) {
      throw new BadRequestException('Invalid admin ID');
    }

    return this.adminManagementService.deleteAdmin(adminId, req.user?.id);
  }

  @Post('upgrade')
  async upgradeUser(@Body() body: unknown, @Req() request: Request) {
    const parsed = UpgradeAdminSchema.safeParse(body);
    if (!parsed.success) {
      throw new BadRequestException(parsed.error.flatten());
    }

    const { userId } = parsed.data;

    const headers = new Headers();
    Object.entries(request.headers).forEach(([key, value]) => {
      if (typeof value === 'string') headers.append(key, value);
      else if (Array.isArray(value)) value.forEach((v) => headers.append(key, v));
    });

    return this.adminManagementService.upgradeUser(userId, headers);
  }
}
