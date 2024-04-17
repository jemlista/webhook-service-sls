import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Injectable } from '@nestjs/common';
import { DBCredentials } from '@/types';
import { getParameters } from '@aws-lambda-powertools/parameters/ssm';
import { SSM_PARAMS } from '../constants';
import {Wallet} from "../modules/wallet/wallets/entities/wallet.entity";
import {WalletLog} from "../modules/wallet/wallet-logs/entities/wallet-log.entity";
import {Transfer} from "../modules/wallet/transfers/entities/transfer.entity";
import {Party} from "../modules/core/parties/entities/party.entity";

export enum DataSources {
  CoreDB = 'CoreDB',
}

@Injectable()
export class DatabaseOptions implements TypeOrmOptionsFactory {
  /**
   * Retrieves the database credentials from the specified configuration path.
   *
   * @return {Promise<DBCredentials>} The database credentials containing host, port, username, password, and database name.
   */
  private async _getCredentials(): Promise<DBCredentials> {
    const configParams = await getParameters(process.env.CONFIG_PATH, {
      maxAge: SSM_PARAMS.DEFAULT_MAX_AGE,
      decrypt: true,
    });

    return {
      host: configParams.CORE_DB_HOST as string,
      port: parseInt(configParams.CORE_DB_PORT as string),
      username: configParams.CORE_DB_USERNAME as string,
      password: configParams.CORE_DB_PASSWORD as string,
      database: configParams.CORE_DB_NAME as string,
    };
  }

  /**
   * Create TypeORM options.
   *
   * @param {string} connectionName - optional connection name
   * @return {Promise<TypeOrmModuleOptions>} TypeORM module options
   */
  public async createTypeOrmOptions(
      connectionName?: string,
  ): Promise<TypeOrmModuleOptions> {
    const dbCredentials = await this._getCredentials();
    const commonConfig = {
      type: 'postgres',
      namingStrategy: new SnakeNamingStrategy(),
      logging: true,
      maxQueryExecutionTime: 1000,
      parseInt8: true,
    };

    const config = {
      [DataSources.CoreDB]: {
        ...dbCredentials,
        entities: [Party, Wallet, WalletLog, Transfer],
      },
    };

    return { ...commonConfig, ...config[connectionName] };
  }
}
