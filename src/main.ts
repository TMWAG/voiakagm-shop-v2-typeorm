import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import 'reflect-metadata';

async function bootstrap() {
  const PORT = process.env.PORT || 5005;
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('VoiakaGM-shop-v2-typeorm')
    .setDescription('Документация API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(PORT, () => console.log(`server started at ${PORT} port`));
}
bootstrap();
