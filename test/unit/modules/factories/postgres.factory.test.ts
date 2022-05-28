import 'reflect-metadata';

// Testing Module
import { PostgresFactory } from '../../../../src/modules/factories/postgres.factory';

// Dto & Creator
import { IPoolConfig } from '../../../../src/models/interface.loader';
import mockCreator from '../../../mock/mock.creator';

// Extract Private Function
import * as PostgresPrivate from '../../../../src/modules/factories/private/postgres.private';
jest.spyOn(PostgresPrivate, 'getOptionInstance');
jest.spyOn(PostgresPrivate, 'setPoolByOption');
jest.spyOn(PostgresPrivate, 'isValidPool');

// Mocking
import { Pool } from 'pg';
jest.mock('pg', () => {
    const mockPool = {
        connect: jest.fn(() => mockCreator.pool.createPoolClient()),
        on: jest.fn()
    };

    return { Pool: jest.fn(() => mockPool )};
})

describe ('PostgresFactory', () => {

    let posFactory: PostgresFactory;

    beforeAll(() => {
        posFactory = new PostgresFactory();
    });

    afterEach(() => {
        jest.clearAllMocks();
        PostgresFactory.pool = null;
    });

    describe ('properties', () => {

        it ('2 static value', () => {
            expect(Object.keys(PostgresFactory).length).toBe(2);

            expect(PostgresFactory.pool).toBeDefined();
            expect(PostgresFactory.initialize).toBeDefined();
        });

    });

    describe ('initialize should call 3 private func', () => {

        it ('any should call 3 func', async () => {

            const poolConfig: IPoolConfig = mockCreator.iPoolConfig.craeteIPoolConfig();
        
            await PostgresFactory.initialize(poolConfig);
    
            expect(PostgresPrivate.getOptionInstance).toBeCalledTimes(1);
            expect(PostgresPrivate.setPoolByOption).toBeCalledTimes(1);
            expect(PostgresPrivate.isValidPool).toBeCalledTimes(1);

        });

    });

    describe ('initialize should return Pool | null', () => {

        it ('undefined return null', async () => {

            const pool: Pool | null = await PostgresFactory.initialize(undefined);

            expect(pool).toBeNull();

        });

        it ('others return not null', async () => {
            
            const poolConfig: IPoolConfig = mockCreator.iPoolConfig.craeteIPoolConfig();
            const pool: Pool | null = await PostgresFactory.initialize(poolConfig);

            expect(pool).toBeNull();

        });

    });
});