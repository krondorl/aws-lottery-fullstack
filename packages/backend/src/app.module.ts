import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThrottlerModule } from '@nestjs/throttler';
import { LotteryModule } from './lottery/lottery.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './lottery/entities/game.entity';
import { PayoutSummary } from './lottery/entities/payout-summary.entity';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register({ ttl: 60 * 10 * 1000 }), // 10 minutes
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'lottery',
      entities: [Game, PayoutSummary],
      synchronize: false,
      retryAttempts: 3,
      retryDelay: 1000,
    }),
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000, // 1 second
        limit: 2,
      },
    ]),
    LotteryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
