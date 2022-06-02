import 'reflect-metadata';
import { PoolClient } from 'pg';
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
});


describe ('PostgresFactory', () => {
    

    it ('has 1 static prop', () => expect(Object.keys(PostgresFactory).length).toBe(1));
    it ('has 0 props', () => {
        const tmp = new PostgresFactory();
        expect(Object.keys(tmp).length).toBe(0);
    });
    

    describe ('logics', () => {

        let pgFactory: PostgresFactory;
    
        beforeAll(() => pgFactory = new PostgresFactory());
        afterEach(() => jest.clearAllMocks());
    
        describe ('static initialize', () => {

            it ('should call 3 private function', async () => {

                const poolConfig: IPoolConfig = mockCreator.Config.iPoolConfig.craeteIPoolConfig();
        
                await PostgresFactory.initialize(poolConfig);
        
                expect(PostgresPrivate.getOptionInstance).toBeCalledTimes(1);
                expect(PostgresPrivate.setPoolByOption).toBeCalledTimes(1);
                expect(PostgresPrivate.isValidPool).toBeCalledTimes(1);

            });

            it ('others return not null', async () => {
                
                const poolConfig: IPoolConfig = mockCreator.Config.iPoolConfig.craeteIPoolConfig();
                const pool: Pool = await PostgresFactory.initialize(poolConfig);

                expect(pool).not.toBeNull();

            });

        });

    });

});