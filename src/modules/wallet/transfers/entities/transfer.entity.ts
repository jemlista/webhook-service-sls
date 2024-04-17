import {
  BaseEntity,
  Check,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import {Wallet} from "../../wallets/entities/wallet.entity";
import {FloatTransformerResolver} from "../../../../resolvers/float.transformer.resolver";
import {Party} from "../../../../modules/core/parties/entities/party.entity";

@Entity('transfers', { schema: 'wallet' })
export class Transfer extends BaseEntity {
  @PrimaryColumn('varchar', {
    primaryKeyConstraintName: 'transfers_uuid_pk',
    length: 15,
  })
  uuid: string;

  @Column('varchar', { length: 15, nullable: true })
  @Index('transfers_parent_uuid_idx')
  parentUUID: string;

  @Column('varchar', { length: 255, nullable: true })
  @Index('transfers_external_id_idx')
  externalId: string;

  @Column('varchar', { length: 15, nullable: true })
  @Index('transfers_credit_card_idx')
  creditCardUUID: string;

  @ManyToOne(() => Wallet, (wallet) => wallet.uuid, { nullable: false })
  @JoinColumn({
    name: 'from_wallet_uuid',
    foreignKeyConstraintName: 'transfers_from_wallet_uuid_fk',
  })
  @Index('transfers_from_wallet_uuid_idx')
  fromWalletUUID: Wallet;

  @ManyToOne(() => Wallet, (wallet) => wallet.uuid, { nullable: false })
  @JoinColumn({
    name: 'to_wallet_uuid',
    foreignKeyConstraintName: 'transfers_to_wallet_uuid_fk',
  })
  @Index('transfers_to_wallet_uuid_idx')
  toWalletUUID: Wallet;

  @Column('varchar', {
    length: 50,
    nullable: false,
  })
  @Check(
    'transfers_type_chk',
    `"type" IN ('authorization', 'incremental_authorization', 'authorization_reversal', 'capture', 'force_capture', 'refund_authorization', 'refund_reversal', 'refund_settlement', 'deposit')`,
  )
  @Index('transfers_type_idx')
  type: string;

  @Column('numeric', {
    precision: 14,
    scale: 2,
    transformer: new FloatTransformerResolver(),
    nullable: false,
  })
  amount: number;

  @Column('text', { nullable: false })
  details: string;

  @Column('varchar', { length: 15, nullable: true })
  @Index('transfers_billing_statement_uuid_idx')
  billingStatementUUID: string;

  @ManyToOne(() => Party, (party) => party.uuid, { nullable: false })
  @JoinColumn({
    name: 'created_by',
    foreignKeyConstraintName: 'transfers_created_by_fk',
  })
  @Index('transfers_created_by_idx')
  createdBy: Party;

  @CreateDateColumn({ type: 'timestamptz' })
  @Index('transfers_created_at_idx')
  createdAt: Date;
}
