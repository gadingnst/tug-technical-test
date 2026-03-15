import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { toNodeHandler } from 'better-auth/node';
import { auth } from '@/modules/auth/auth.provider';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Mount Better Auth handler
  app.use('/api/auth', toNodeHandler(auth));

  await app.listen(process.env.PORT ?? 9100);
}

void bootstrap();
