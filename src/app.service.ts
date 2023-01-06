import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  isSpam(): boolean {
    return true;
  }
}
