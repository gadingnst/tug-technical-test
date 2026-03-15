import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '@/database/database.module';
import { WellnessPackagesModule } from '@/modules/wellness-packages/wellness-packages.module';

@Module({
  imports: [DatabaseModule, WellnessPackagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
