import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import Logging from 'library/Logging'
import cookieParser from 'cookie-parser'
import express from 'express'

import { AppModule } from './modules/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  })

  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  })

  //Various middleware setup
  app.useGlobalPipes(new ValidationPipe())
  app.use(cookieParser())
  //Setup to display files
  app.use('/files', express.static('files'))

  const PORT = process.env.PORT || 8080
  await app.listen(PORT)

  Logging.log(` App is listening on: ${await app.getUrl()}`)
}

bootstrap()
