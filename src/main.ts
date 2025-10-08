import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Global exception filter voor betere error responses
  app.useGlobalFilters(new AllExceptionsFilter());
  
  // CORS voor frontend communicatie
  app.enableCors({
    origin: ['http://localhost:8080', 'http://localhost:3001'], // Vue dev server ports
    credentials: true,
  });
  
  await app.listen(process.env.PORT ?? 3000);
  console.log('Backend draait op http://localhost:3000');
}
bootstrap();
