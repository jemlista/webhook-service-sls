import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSources, DatabaseOptions } from './config/database';
import {WalletsModule} from "./modules/wallet/wallets/wallets.module";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseOptions,
      name: DataSources.CoreDB,
    }),
    WalletsModule,
  ],
})
export class AppModule {}
