import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './shared/http-exception.filter';
import { PrismaService } from './shared/prisma';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      "origin": "*",
      "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    }
  });

  const prisma = app.get(PrismaService);
  await prisma.enableShutdownHooks(app)

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.PORT || 3000, "0.0.0.0");
}
bootstrap();
