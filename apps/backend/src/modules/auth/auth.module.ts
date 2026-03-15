import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AdminManagementController } from './admin-management.controller';

@Module({
  controllers: [AuthController, AdminManagementController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
