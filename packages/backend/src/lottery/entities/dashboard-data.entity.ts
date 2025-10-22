import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('dahsboard_games')
export class DashboardData {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Mega Ball 500' })
  @Column({ unique: true })
  name: string;

  @ApiProperty({ example: '5.00' })
  @Column('numeric', { precision: 5, scale: 2 })
  ticket_price: number;

  @ApiProperty({ example: '100000.00' })
  @Column('numeric', { precision: 12, scale: 2 })
  initial_jackpot: number;

  @ApiProperty({ example: 0 })
  @Column('int', { default: 0 })
  total_tickets_sold: number;

  @ApiProperty({ example: '100000.00' })
  @Column('numeric', { precision: 12, scale: 2 })
  current_jackpot: number;

  @ApiProperty({ example: '50000.00' })
  @Column('numeric', { precision: 12, scale: 2 })
  total_prizes_paid: number;

  @Column({ type: 'date', nullable: true })
  @ApiProperty({ example: '2025-04-30' })
  last_payout_date: Date | null;
}
