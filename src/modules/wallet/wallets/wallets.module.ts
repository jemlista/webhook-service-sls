import { Module } from '@nestjs/common';
import { DataSources } from '../../../config/database';
import {WalletsRepository} from './wallets.repository';
import {TypeOrmExModule} from "../../../resolvers/typeorm/typeorm-ex.module";
import {WalletsService} from "./services/wallets.service";


@Module({
    imports: [
        TypeOrmExModule.forCustomRepository(
            [WalletsRepository],
            DataSources.CoreDB,
        ),
    ],
    providers: [WalletsService],
})
export class WalletsModule {}
