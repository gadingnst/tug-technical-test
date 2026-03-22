import { Module } from '@nestjs/common';
import { AdminManagementController } from './admin-management.controller';
import { AdminManagementService } from './admin-management.service';
import { AuthModule } from '@/modules/auth/auth.module'; // Import AuthModule for AuthGuard

@Module({
  imports: [AuthModule],
  controllers: [AdminManagementController],
  providers: [AdminManagementService],
})
export class AdminManagementModule {}
