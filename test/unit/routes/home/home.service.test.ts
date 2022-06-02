import 'reflect-metadata';

// Testing Module
import { HomeService } from '../../../../src/routes/service.loader';
import { HomeRepository } from '../../../../src/routes/repository.loader';
import { DevQueryBuilder, PostgresFactory, ResponseProvider } from '../../../../src/modules/module.loader';


describe ('Home Service', () => {
    
    let resProvider: ResponseProvider;
    let homeRepository: HomeRepository;
    let homeService: HomeService;

    beforeAll(() => {
        homeRepository = new HomeRepository(new DevQueryBuilder(), new PostgresFactory());
        resProvider = new ResponseProvider();
        homeService = new HomeService(homeRepository, resProvider);
    });

    it ('has 2 properties', () => expect(Object.keys(homeService).length).toBe(2));
    it ('has 2 functions', () => {
        expect(homeService.join).toBeDefined();
        expect(homeService.login).toBeDefined();
    });

});