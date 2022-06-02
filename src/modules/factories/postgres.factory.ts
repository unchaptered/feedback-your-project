import { Pool, PoolClient, PoolConfig } from 'pg';
import { provide } from 'inversify-binding-decorators';

// di
import { MODULES } from '../../constants/constant.loader';

// dto
import { IPoolConfig } from '../../models/interface.loader';

// private
import * as PostgresPrivate from './private/postgres.private';


@provide(MODULES.PostgresFactory)
export class PostgresFactory {

    static pool: Pool;

    static async initialize(PG_POOL: IPoolConfig): Promise<Pool> {

        const option: PoolConfig = PostgresPrivate.getOptionInstance(PG_POOL);
        const pool: Pool = PostgresPrivate.setPoolByOption(option);

        const isValid = await PostgresPrivate.isValidPool(pool);
        if (isValid) PostgresFactory.pool = pool;

        return PostgresFactory.pool;

    }

    public async getClient(): Promise<PoolClient | Error> {

        try {
           
            return await PostgresFactory.pool.connect();

        } catch(err) {

            if (err instanceof Error) return err;
            else return new Error('UnkwonError is occured : ' + JSON.stringify(err));

        }

    }

};