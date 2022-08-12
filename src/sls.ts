/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as serverless from '@serverless-devs/fc-http';

const app = async (req, res, context) => {
  const nest = await NestFactory.create(AppModule);
  // @ts-ignore
  await nest.listen();
  // @ts-ignore
  nest.httpAdapter.instance(req, res, context);
};

export const handler = serverless(app);
