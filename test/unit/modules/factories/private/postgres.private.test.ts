// Testing Module
import * as PostgresPrivate from '../../../../../src/modules/factories/private/postgres.private';

// Dto & Creator
import { IPoolConfig } from '../../../../../src/models/interface.loader';
import mockCreator from '../../../../mock/mock.creator';

// Mocking
import { Pool, PoolConfig } from 'pg';
jest.mock('pg', () => {
    const mockPool = {
        connect: jest.fn(() => mockCreator.pool.createPoolClient()),
        on: jest.fn()
    };

    return { Pool: jest.fn(() => mockPool )};
});

describe ('Postgres Private', () => {

    it ('has 3 properties', () => {

        expect(Object.keys(PostgresPrivate).length).toBe(3);

        expect(PostgresPrivate.getOptionInstance).toBeDefined();
        expect(PostgresPrivate.setPoolByOption).toBeDefined();
        expect(PostgresPrivate.isValidPool).toBeDefined();
        
    });

    describe ('getOptionInstance', () => {

        it ('should return PoolConfig', () => {

            const poolConfig: IPoolConfig = mockCreator.Config.iPoolConfig.craeteIPoolConfig();
            const option: PoolConfig = PostgresPrivate.getOptionInstance(poolConfig);

            expect(Object.keys(option).length).toBe(5);

        });

    });

    describe ('isValidPool', () => {

        it ('should return true', () => {

            const poolConfig: IPoolConfig = mockCreator.Config.iPoolConfig.craeteIPoolConfig();
            const option: PoolConfig = PostgresPrivate.getOptionInstance(poolConfig);
            const pool: Pool = PostgresPrivate.setPoolByOption(option);

            const isValid = PostgresPrivate.isValidPool(pool);
            expect(isValid).toBeTruthy();

        });

    });

});

