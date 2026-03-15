import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { toNodeHandler } from 'better-auth/node';
import { auth } from '@/modules/auth/auth.provider';
import { TRUSTED_ORIGINS } from '@/configs/trusted-origins';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: TRUSTED_ORIGINS,
    credentials: true,
  });

  // Mount Better Auth handler
  app.use('/api/auth', toNodeHandler(auth));

  await app.listen(process.env.PORT ?? 9100);
}

void bootstrap();
