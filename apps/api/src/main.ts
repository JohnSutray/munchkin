import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'apps/api/src/app/app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: {allowedHeaders: '*', origin: '*'}});
  const port = process.env.PORT || 3000;
  await app.listen(port, () => Logger.log('Listening at http://localhost:' + port));
}

bootstrap();
