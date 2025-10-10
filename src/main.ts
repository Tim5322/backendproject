import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  
  // Global exception filter voor betere error responses
  app.useGlobalFilters(new AllExceptionsFilter());
  
  // CORS voor frontend communicatie
  app.enableCors({
    origin: [configService.get('VUE_APP_API_BASE_URL')!],
    credentials: true,
  });
  
  await app.listen(configService.get('PORT') || 3000);
  console.log(`Backend draait op http://localhost:${configService.get('PORT') || 3000}`);
}
bootstrap();
