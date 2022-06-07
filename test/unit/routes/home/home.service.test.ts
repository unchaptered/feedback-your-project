import 'reflect-metadata';

// Testing Module
import { HomeService } from '../../../../src/routes/service.loader';
import { BaseLayer } from '../../../../src/routes/base/base.layer';

import { HomeRepository } from '../../../../src/routes/repository.loader';
import { DevQueryBuilder, PostgresFactory } from '../../../../src/modules/module.loader';


describe ('Home Service', () => {
    
    let homeRepository: HomeRepository;
    let homeService: HomeService;

    beforeAll(() => {
        homeRepository = new HomeRepository(new DevQueryBuilder(), new PostgresFactory());
        homeService = new HomeService(homeRepository);
    });

    it ('has 2 properties', () => expect(Object.keys(homeService).length).toBe(2));
    it ('has 2 functions', () => {
        expect(homeService.join).toBeDefined();
        expect(homeService.login).toBeDefined();
    });
    it ('extends BaseLayer', () => expect(homeService).toBeInstanceOf(BaseLayer));

});