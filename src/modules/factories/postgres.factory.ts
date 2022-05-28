import { Pool, PoolConfig } from 'pg';
import { provide } from 'inversify-binding-decorators';

// di
import { MODULES } from '../../constants/modules.symbol';

// dto
import { IPoolConfig } from '../../models/interface.loader';

// private
import * as PostgresPrivate from './private/postgres.private';


@provide(MODULES.PostgresFactory)
export class PostgresFactory {

    static pool: Pool | null = null;

    static async initialize(PG_POOL: IPoolConfig | undefined): Promise<Pool | null> {

        if (!PG_POOL) return null;

        const option: PoolConfig = PostgresPrivate.getOptionInstance(PG_POOL);
        const pool: Pool = PostgresPrivate.setPoolByOption(option);

        const isValid = await PostgresPrivate.isValidPool(pool);
        if (isValid) PostgresFactory.pool = pool;

        return PostgresFactory.pool;

    }

};