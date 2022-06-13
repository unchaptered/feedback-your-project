import 'reflect-metadata';

// Testing Module
import { AuthRepository } from '../../../../src/routes/layer.loader';

// Providers
import { PostgresFactory, DevQueryBuilder, ConfigFactory } from '../../../../src/modules/module.loader';

// Dtos & Creator
import mockCreator from '../../../mock/mock.creator';
import { BaseLayer } from '../../../../src/routes/base/base.layer';


describe ('Auth Repository', () => {

    let pgFactory: PostgresFactory;
    let devQuery: DevQueryBuilder;

    let authRepo: AuthRepository;

    beforeAll( async () => {

        const MODE = process?.env?.NODE_ENV ?? 'test';
        const config = await ConfigFactory.initialize(MODE);
        const pool = await PostgresFactory.initialize(config?.POOL_CONF);

        devQuery = new DevQueryBuilder();
        pgFactory = new PostgresFactory();
        pgFactory.getClient = jest.fn(async () => mockCreator.pool.createPoolClient());

        authRepo = new AuthRepository(devQuery, pgFactory);

    });


    it ('has 2 properties', () => expect(Object.keys(authRepo).length).toBe(3));
    it ('has 1 function', () => expect(authRepo.publishToken).toBeDefined());
    it ('extends BaseLayer', () => expect(authRepo).toBeInstanceOf(BaseLayer));
});