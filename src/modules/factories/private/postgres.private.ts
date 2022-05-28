import { Pool, PoolConfig, PoolClient } from 'pg';

//dtos
import { IPoolConfig } from '../../../models/interface.loader';


export const getOptionInstance = (PG_POOL: IPoolConfig): PoolConfig => {
    const option: PoolConfig = {
        host: PG_POOL.HOST,
        user: PG_POOL.USER,
        database: PG_POOL.DATABASE,
        password: PG_POOL.PASSWORD,
        port: PG_POOL.PORT
    };
    return option;
};

export const setPoolByOption = (option: PoolConfig): Pool => {
    return new Pool(option).on('connect', () => console.log('PostgresFactory : 풀 클라이언트가 연결되었습니다.'));
};

export const isValidPool = async (pool: Pool): Promise<boolean> => {

    try {

        const poolClient: PoolClient = await pool.connect();

        poolClient.release();
        return true;

    } catch (err) {

        console.log(err);
        return false;

    }

};