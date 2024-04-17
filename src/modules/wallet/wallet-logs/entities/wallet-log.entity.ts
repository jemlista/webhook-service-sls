import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Unique,
} from 'typeorm';
import { FloatTransformerResolver } from '../../../../resolvers/float.transformer.resolver';
import {Wallet} from "../../wallets/entities/wallet.entity";
import {Transfer} from "./../../transfers/entities/transfer.entity";

@Entity('wallet_logs', { schema: 'wallet' })
@Unique('wallet_logs_wallet_uuid_transfer_uuid_uk', ['wallet', 'transfer'])
export class WalletLog extends BaseEntity {
  @PrimaryColumn('varchar', {
    primaryKeyConstraintName: 'wallets_logs_uuid_pk',
    length: 15,
  })
  uuid: string;

  @ManyToOne(() => Wallet, (wallet) => wallet.uuid, { nullable: false })
  @JoinColumn({
    name: 'wallet_uuid',
    foreignKeyConstraintName: 'wallet_logs_wallet_uuid_fk',
  })
  @Index('wallet_logs_wallet_uuid_idx')
  wallet: Wallet;

  @ManyToOne(() => Transfer, (transfer) => transfer.uuid, { nullable: false })
  @JoinColumn({
    name: 'transfer_uuid',
    foreignKeyConstraintName: 'wallet_logs_transfer_uuid_fk',
  })
  @Index('wallet_logs_transfer_uuid_idx')
  transfer: Transfer;

  @Column('numeric', {
    precision: 14,
    scale: 2,
    nullable: false,
    transformer: new FloatTransformerResolver(),
    default: 0.0,
  })
  amount: number;

  @Column('numeric', {
    precision: 14,
    scale: 2,
    nullable: false,
    transformer: new FloatTransformerResolver(),
    default: 0.0,
  })
  running_balance: number;

  @Column('numeric', {
    precision: 14,
    scale: 2,
    nullable: false,
    transformer: new FloatTransformerResolver(),
    default: 0.0,
  })
  running_pending_balance: number;
}
