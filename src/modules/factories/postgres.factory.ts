import { Pool, PoolClient, PoolConfig } from 'pg';
import { provide } from 'inversify-binding-decorators';

// DI Constants
import { FACTORIES } from '../../constants/constant.loader';
import { BaseModule } from '../../modules/base/base.modules';
import { IPostgresFactory } from './interfaces/i.postgres.factory';
import * as PostgresPrivate from './private/postgres.private';

// Dto (Claesses, Interfaces)
import { IPoolConfig } from '../../models/interface.loader';
import { CustomException, IntervalServerError, UnkownServerError } from '../../models/class.loader';


@provide(FACTORIES.PostgresFactory)
export class PostgresFactory extends BaseModule implements IPostgresFactory {

    static pool: Pool;

    static async initialize(PG_POOL: IPoolConfig): Promise<Pool> {

        const option: PoolConfig = PostgresPrivate.getOptionInstance(PG_POOL);
        const pool: Pool = PostgresPrivate.setPoolByOption(option);

        const isValid = await PostgresPrivate.isValidPool(pool);
        if (isValid) PostgresFactory.pool = pool;

        return PostgresFactory.pool;

    }

    public async getClient(): Promise<PoolClient | CustomException> {

        try {
           
            return await PostgresFactory.pool.connect();

        } catch(err) {

            return this.errorHandler(err);

        }

    }

};