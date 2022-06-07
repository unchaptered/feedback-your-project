import 'reflect-metadata';

// Testing Module
import { HomeRepository } from '../../../../src/routes/repository.loader';
import { BaseLayer } from '../../../../src/routes/base/base.layer';

import { DevQueryBuilder, PostgresFactory } from '../../../../src/modules/module.loader';


describe ('Home Repository', () => {
    
    let devQuery: DevQueryBuilder;
    let pgFactory: PostgresFactory;
    let homeRepository: HomeRepository;

    beforeAll(() => {

        devQuery = new DevQueryBuilder();
        pgFactory = new PostgresFactory();
        homeRepository = new HomeRepository(devQuery, pgFactory);

    });

    it ('has 2 properties', () => expect(Object.keys(homeRepository).length).toBe(3));
    it('has 2 properties', () => {
        expect(homeRepository.join).toBeDefined();
        expect(homeRepository.login).toBeDefined();
    });
    it ('extends BaseLayer', () => expect(homeRepository).toBeInstanceOf(BaseLayer));

});