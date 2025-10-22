import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Game } from './entities/game.entity';
import { PayoutSummary } from './entities/payout-summary.entity';
import { RawSalesResult } from './interfaces/raw-sales-result.interface';
import { AggregatedPayoutsResult } from './interfaces/aggregated-payouts-result.interace';
import { DashboardData } from './entities/dashboard-data.entity';

@Injectable()
export class LotteryService {
  private readonly logger = new Logger(LotteryService.name);

  constructor(
    @InjectRepository(Game)
    private gamesRepository: Repository<Game>,
    @InjectRepository(PayoutSummary)
    private summaryRepository: Repository<PayoutSummary>,
    private dataSource: DataSource,
  ) {}

  async getLotteryGames(): Promise<Game[]> {
    try {
      return await this.gamesRepository.find();
    } catch (error) {
      console.error('Database Error retrieving games:', error);
      throw new InternalServerErrorException(
        'Failed to retrieve lottery games due to a database error.',
      );
    }
  }

  async getPayoutSummary(): Promise<PayoutSummary[]> {
    try {
      return this.summaryRepository.find();
    } catch (error) {
      console.error('Database Error retrieving payout summaries:', error);
      throw new InternalServerErrorException(
        'Failed to retrieve payout summaries due to a database error.',
      );
    }
  }

  async getCombinedDashboardData(): Promise<DashboardData[]> {
    try {
      const [games, payouts] = await Promise.all([
        this.getLotteryGames(),
        this.getPayoutSummary(),
      ]);

      // Simple join logic (for demonstration)
      return games.map((game) => {
        const summary = payouts.find((p) => p.game_name === game.name);
        return {
          ...game,
          total_prizes_paid: summary?.total_prizes_paid || 0,
          last_payout_date: summary?.last_payout_date || null,
        };
      });
    } catch (error) {
      console.error('Error combining dashboard data:', error);
      throw new InternalServerErrorException(
        'Failed to retrieve combined dashboard data due to a database error.',
      );
    }
  }

  async runDataProcessing(): Promise<void> {
    this.logger.log('Starting Jackpot and Payout updates...');

    try {
      await this.dataSource.transaction(async (entityManager) => {
        const rawSalesData = await entityManager.query<RawSalesResult[]>(`
          SELECT 
          game_name,
          SUM(tickets_sold) AS total_tickets_sold_raw,
          SUM(tickets_sold * lg.ticket_price) AS total_revenue
          FROM sales_data_raw sdr
          JOIN lottery_games lg ON sdr.game_name = lg.name
          GROUP BY game_name, lg.ticket_price;
          `);

        for (const sale of rawSalesData) {
          const contribution = parseFloat(sale.total_revenue) * 0.5; // 50% rule

          await entityManager.query(
            `
              UPDATE lottery_games
              SET 
              current_jackpot = current_jackpot + $1,
              total_tickets_sold = total_tickets_sold + $2
              WHERE name = $3;
              `,
            [
              contribution,
              parseInt(sale.total_tickets_sold_raw),
              sale.game_name,
            ],
          );
        }

        const aggregatedPayouts = await entityManager.query<
          AggregatedPayoutsResult[]
        >(`
            SELECT 
            game_name,
            SUM(payout_amount) AS total_paid,
            MAX(payout_date) AS latest_payout_date
            FROM payouts_raw
            GROUP BY game_name;
            `);

        for (const payout of aggregatedPayouts) {
          await entityManager.query(
            `
                INSERT INTO payout_summary (game_name, total_prizes_paid, last_payout_date)
                VALUES ($1, $2, $3)
                ON CONFLICT (game_name) 
                DO UPDATE SET 
                total_prizes_paid = payout_summary.total_prizes_paid + EXCLUDED.total_prizes_paid,
                last_payout_date = GREATEST(payout_summary.last_payout_date, EXCLUDED.last_payout_date);
        `,
            [
              payout.game_name,
              parseFloat(payout.total_paid),
              payout.latest_payout_date,
            ],
          );
        }
      });
    } catch (error) {
      this.logger.error('Error during data processing:', error);
      throw new InternalServerErrorException(
        'Data processing failed due to a database error.',
      );
    }
  }
}
