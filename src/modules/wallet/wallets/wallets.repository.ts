import {BaseRepository} from "../../core/base.repository";
import {Wallet} from "../../wallet/wallets/entities/wallet.entity";
import {CustomRepository} from "../../../resolvers/typeorm/typeorm-ex.decorator";


@CustomRepository(Wallet)
export class WalletsRepository extends BaseRepository<Wallet> {}
