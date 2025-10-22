import { Controller, Get, HttpCode, Post, HttpStatus } from '@nestjs/common';
import { LotteryService } from './lottery.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Game } from './entities/game.entity';
import { PayoutSummary } from './entities/payout-summary.entity';
import { DashboardData } from './entities/dashboard-data.entity';

@Controller('api')
export class LotteryController {
  constructor(private readonly lotteryService: LotteryService) {}

  @Get('games')
  @ApiOperation({
    summary: 'List lottery games',
    description: 'List lottery games',
  })
  @ApiResponse({
    status: 200,
    description: 'List of lottery games',
    type: [Game],
  })
  getGames() {
    return this.lotteryService.getLotteryGames();
  }

  @Get('payouts')
  @ApiOperation({
    summary: 'List lottery payout summaries',
    description: 'List of payout summaries for all lottery games',
  })
  @ApiResponse({
    status: 200,
    description: 'List of payout summary for lottery games',
    type: [PayoutSummary],
  })
  getPayoutSummary() {
    return this.lotteryService.getPayoutSummary();
  }

  @Get('dashboard-data')
  @ApiOperation({
    summary: 'Get combined lottery dashboard data',
    description:
      'Retrieves combined data about lottery games including game details and payout information',
  })
  @ApiResponse({
    status: 200,
    description: 'Combined lottery games and payout data',
    type: [DashboardData],
  })
  getDashboardData() {
    return this.lotteryService.getCombinedDashboardData();
  }

  @Post('process-data')
  @HttpCode(HttpStatus.OK)
  async processData() {
    console.log('Starting data processing...');

    await this.lotteryService.runDataProcessing();

    return {
      message: 'Data processing complete. Metrics updated successfully.',
      timestamp: new Date().toISOString(),
    };
  }
}
