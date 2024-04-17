import {
  BaseEntity,
  Entity,
  PrimaryColumn,
} from 'typeorm';

@Entity('parties', { schema: 'core' })
export class Party extends BaseEntity {
  @PrimaryColumn('varchar', {
    primaryKeyConstraintName: 'parties_uuid_pk',
    length: 100,
  })
  uuid: string;


}
