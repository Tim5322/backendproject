import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  
  // Global exception filter voor betere error responses
  app.useGlobalFilters(new AllExceptionsFilter());
  // Global validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
  
  // CORS voor frontend communicatie
  app.enableCors({
    origin: [configService.get('VUE_APP_API_BASE_URL')!],
    credentials: true,
  });

  // Luister uitsluitend op de PORT env var (geen fallback)
  const portStr = process.env.PORT;
  if (!portStr) {
    throw new Error('PORT environment variable is required');
  }
  const port = Number(portStr);
  if (Number.isNaN(port)) {
    throw new Error('PORT must be a number');
  }

  await app.listen(port);
  console.log(`Backend draait op http://localhost:${port}`);
}
bootstrap();
