import { Injectable } from '@nestjs/common';
import { HEALTH_MSG } from './health.constant';

@Injectable()
export class AppService {
  getHealth(): { status: string; message: string } {
    return {
      status: 'ok',
      message: HEALTH_MSG,
    };
  }
}
