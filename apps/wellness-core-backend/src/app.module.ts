import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '@/database/database.module';
import { WellnessPackagesModule } from '@/modules/wellness-packages/wellness-packages.module';
import { AuthModule } from '@/modules/auth/auth.module';

@Module({
  imports: [DatabaseModule, WellnessPackagesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
