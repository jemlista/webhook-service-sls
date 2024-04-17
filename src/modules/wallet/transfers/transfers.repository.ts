import {Transfer} from "@/modules/wallet/transfers/entities/transfer.entity";
import {CustomRepository} from "@/resolvers/typeorm/typeorm-ex.decorator";
import {BaseRepository} from "@/modules/core/base.repository";


@CustomRepository(Transfer)
export class TransfersRepository extends BaseRepository<Transfer> {}
