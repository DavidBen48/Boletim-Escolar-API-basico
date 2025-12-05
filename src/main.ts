import { NestFactory } from '@nestjs/core'; 

import { AppModule } from './app.module';
import * as process from 'process';

function port(port: number = 3000): number {
  return Number(process.env.PORT) || port;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port());
}

bootstrap();
