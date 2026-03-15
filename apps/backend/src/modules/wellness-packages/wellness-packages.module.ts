import { Module } from '@nestjs/common';
import {
  AdminWellnessPackagesController,
  MobileWellnessPackagesController,
} from './wellness-packages.controller';
import { WellnessPackagesService } from './wellness-packages.service';
import { AuthModule } from '@/modules/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [
    AdminWellnessPackagesController,
    MobileWellnessPackagesController,
  ],
  providers: [WellnessPackagesService],
  exports: [WellnessPackagesService],
})
export class WellnessPackagesModule {}
