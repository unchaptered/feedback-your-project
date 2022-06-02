import 'reflect-metadata';

// Testing Module
import { HomeController } from '../../../../src/routes/controller.loader';
import { HomeRepository } from '../../../../src/routes/repository.loader';
import { HomeService } from '../../../../src/routes/service.loader';
import { DevQueryBuilder, LoggerProvider, PostgresFactory, ResponseProvider } from '../../../../src/modules/module.loader';


describe ('Home Controller', () => {

    let logProvider: LoggerProvider;
    let homeService: HomeService;
    let homeController: HomeController;

    beforeAll(() => {
        logProvider = new LoggerProvider();
        homeService = new HomeService(
            new HomeRepository(new DevQueryBuilder(), new PostgresFactory()),
            new ResponseProvider()
        );
        homeController = new HomeController(homeService, logProvider);
    });

    it ('has 2 properties', () => expect(Object.keys(homeController).length).toBe(2));
    it ('has 2 function', () => {
        expect(homeController.get).toBeDefined();
        expect(homeController.join).toBeDefined();
        expect(homeController.login).toBeDefined();
    });

});