import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // enable CORS
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  });

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
  });

  const config = new DocumentBuilder()
    .setTitle('Gordon Ramsay Quotes API')
    .setDescription('System API for Process Operations')
    .setVersion('1.0')
    .addTag('quotes')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-explorer', app, document);

  await app.listen(3000);
}
bootstrap();
