import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getRandomNumber(): string {
    return `Hello World! ${String(Math.floor(Math.random() * 10000))}`;
  }

  getHello(): string {
    return 'Hello World!';
  }
}
