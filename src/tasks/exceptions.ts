import { HttpException, HttpStatus } from '@nestjs/common';

export class Deleted extends HttpException {
  constructor() {
    super('deleted', HttpStatus.GONE);
  }
}
