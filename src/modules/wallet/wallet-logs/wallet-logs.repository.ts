import { WalletLog } from "@/modules/wallet/wallet-logs/entities/wallet-log.entity";
import { CustomRepository } from "@/resolvers/typeorm/typeorm-ex.decorator";
import { BaseRepository } from "@/modules/core/base.repository";
@CustomRepository(WalletLog)
export class WalletLogsRepository extends BaseRepository<WalletLog> {}
