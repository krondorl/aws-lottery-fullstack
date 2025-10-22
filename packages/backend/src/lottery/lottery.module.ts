import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LotteryService } from './lottery.service';
import { LotteryController } from './lottery.controller';
import { Game } from './entities/game.entity';
import { PayoutSummary } from './entities/payout-summary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Game, PayoutSummary])],
  controllers: [LotteryController],
  providers: [LotteryService],
})
export class LotteryModule {}
