import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from "cookie-parser";
import { AllExceptionsFilter } from './helpers/error.handling';
import { WinstonLogger, WinstonModule } from 'nest-winston';
import { winstonConfig } from './helpers/winston-logger';

// somewhere in your initialization file

async function start() {
  try {
    const PORT = process.env.PORT || 3030;
    console.log(PORT);
    
    const app = await NestFactory.create(AppModule,{
      logger: WinstonModule.createLogger(winstonConfig)
    });
    app.setGlobalPrefix("api")
    
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe())
    app.useGlobalFilters(new AllExceptionsFilter);

     const config = new DocumentBuilder()
       .setTitle("Printing house")
       .setDescription("Printing house project REST API")
       .setVersion("1.0")
       .addTag("NESTJS, validation, swagger, guard, sequelize, pg")
       .build();
     const document = SwaggerModule.createDocument(app, config);
     SwaggerModule.setup("api/docs", app, document);
    await app.listen(PORT, () => {
      console.log(`Server started at: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();
