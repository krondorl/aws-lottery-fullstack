import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { HEALTH_MSG } from './health.constant';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  @ApiOperation({
    summary: 'Check API health status',
    description:
      'Returns the current health status of the API service along with a status message',
  })
  @ApiResponse({
    status: 200,
    description: 'Health check status',
    example: { status: 'ok', message: HEALTH_MSG },
  })
  getHealth(): { status: string; message: string } {
    return this.appService.getHealth();
  }
}
