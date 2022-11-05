import { HttpException, HttpStatus } from '@nestjs/common';

import { PrismaClientError } from './PrismaClientError';

export class NotFoundError extends HttpException {
  constructor(e: PrismaClientError) {
    super(e.meta.cause, HttpStatus.NOT_FOUND);
  }
}