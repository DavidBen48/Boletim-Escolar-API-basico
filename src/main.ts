import { NestFactory } from '@nestjs/core'; 


// versão -> 2.0: importação do Swagger
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


import { AppModule } from './app.module';
import * as process from 'process';

function port(port: number = 3000): number {
  return Number(process.env.PORT) || port;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // implementação direta do Swagger no projeto
  const config = new DocumentBuilder()
    .setTitle('API do projeto: Boletim Escolar')
    .setDescription('Documentação da API com todos os endpoints e exemplos de uso.')
    .setVersion('1.0')
    .addBearerAuth() // autenticação com TOKEN  
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port());
}

bootstrap();


