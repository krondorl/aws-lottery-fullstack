import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('payout_summary')
export class PayoutSummary {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1 })
  id: number;

  @Column({ unique: true })
  @ApiProperty({ example: 'Mega Ball 500' })
  game_name: string;

  @Column('numeric', { precision: 12, scale: 2, default: 0.0 })
  @ApiProperty({ example: '100000.0' })
  total_prizes_paid: number;

  @Column({ type: 'date', nullable: true })
  @ApiProperty({ example: '2025-04-30' })
  last_payout_date: Date;
}
