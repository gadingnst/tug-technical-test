import { Module } from '@nestjs/common';
import {
  AdminWellnessPackagesController,
  MobileWellnessPackagesController,
} from './wellness-packages.controller';
import { WellnessPackagesService } from './wellness-packages.service';

@Module({
  controllers: [
    AdminWellnessPackagesController,
    MobileWellnessPackagesController,
  ],
  providers: [WellnessPackagesService],
  exports: [WellnessPackagesService],
})
export class WellnessPackagesModule {}
