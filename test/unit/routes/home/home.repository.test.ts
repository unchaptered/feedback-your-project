import 'reflect-metadata';
import { DevQueryBuilder, PostgresFactory } from '../../../../src/modules/module.loader';

// Testing Module
import { HomeRepository } from '../../../../src/routes/repository.loader';


describe ('Home Repository', () => {
    
    let devQuery: DevQueryBuilder;
    let pgFactory: PostgresFactory;
    let homeRepository: HomeRepository;

    beforeAll(() => {

        devQuery = new DevQueryBuilder();
        pgFactory = new PostgresFactory();
        homeRepository = new HomeRepository(devQuery, pgFactory);

    });

    it ('has 2 properties', () => expect(Object.keys(homeRepository).length).toBe(2));
    it('has 2 properties', () => {
        expect(homeRepository.join).toBeDefined();
        expect(homeRepository.login).toBeDefined();
    });

});