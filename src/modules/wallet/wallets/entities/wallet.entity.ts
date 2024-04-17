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
  Unique,
  UpdateDateColumn,
} from 'typeorm';

import { FloatTransformerResolver } from '../../../../resolvers/float.transformer.resolver';
import {Party} from "../../../core/parties/entities/party.entity";
import {WALLET_STATUS} from "../../wallet-constants";

@Entity('wallets', { schema: 'wallet' })
@Unique('wallets_composite_uk', ['party', 'currencyCode', 'type'])
export class Wallet extends BaseEntity {
  @PrimaryColumn('varchar', {
    primaryKeyConstraintName: 'wallets_uuid_pk',
    length: 15,
  })
  uuid: string;

  @ManyToOne(() => Party, (party) => party.uuid, { nullable: false })
  @JoinColumn({
    name: 'party_uuid',
    foreignKeyConstraintName: 'wallets_party_uuid_fk',
  })
  @Index('wallets_party_uuid_idx')
  party: Party;

  @Column('varchar', { length: 3, nullable: false })
  currencyCode: string;

  @Column('varchar', { length: 50, nullable: false })
  @Check('wallets_type_chk', `"type" IN ('credit_account', 'fund')`)
  @Index('wallets_type_idx')
  type: string;

  @Column('numeric', {
    precision: 14,
    scale: 2,
    nullable: false,
    transformer: new FloatTransformerResolver(),
    default: 0.0,
  })
  balance: number;

  @Column('numeric', {
    precision: 14,
    scale: 2,
    nullable: false,
    transformer: new FloatTransformerResolver(),
    default: 0.0,
  })
  pendingBalance: number;

  @Column('numeric', {
    precision: 14,
    scale: 2,
    nullable: true,
    transformer: new FloatTransformerResolver(),
  })
  creditLimit: number;

  @Column('numeric', {
    precision: 14,
    scale: 2,
    nullable: true,
    transformer: new FloatTransformerResolver(),
  })
  availableCredit: number;

  @Column('varchar', {
    length: 15,
    nullable: false,
    default: WALLET_STATUS.ACTIVE,
  })
  @Check('wallets_status_chk', `"status" IN ('active', 'inactive')`)
  @Index('wallets_status_idx')
  status: string;

  @ManyToOne(() => Party, (party) => party.uuid, { nullable: false })
  @JoinColumn({
    name: 'created_by',
    foreignKeyConstraintName: 'wallets_created_by_fk',
  })
  @Index('wallets_created_by_idx')
  createdBy: Party;

  @CreateDateColumn({ type: 'timestamptz' })
  @Index('wallets_created_at_idx')
  createdAt: Date;

  @ManyToOne(() => Party, (party) => party.uuid, { nullable: true })
  @JoinColumn({
    name: 'updated_by',
    foreignKeyConstraintName: 'wallets_updated_by_fk',
  })
  @Index('wallets_updated_by_idx')
  updatedBy: Party;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
