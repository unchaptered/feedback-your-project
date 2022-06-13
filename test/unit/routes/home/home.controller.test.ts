import 'reflect-metadata';
import { BaseHttpController } from 'inversify-express-utils';

// Testing Module
import { BaseController } from '../../../../src/routes/base/base.controller';
import { HomeController, HomeRepository, HomeService } from '../../../../src/routes/layer.loader';
import { DevQueryBuilder, DtoBuilder, JoiValidator, LoggerProvider, PostgresFactory, ResponseProvider } from '../../../../src/modules/module.loader';


describe ('Home Controller', () => {

    // Layer
    let homeService: HomeService;
    // Module
    let logProvider: LoggerProvider;
    let dtoBuilder: DtoBuilder;
    let resProvider: ResponseProvider;
    
    // Testing Module
    let homeController: HomeController;

    beforeAll(() => {

        logProvider = new LoggerProvider();
        homeService = new HomeService(
            new HomeRepository(new DevQueryBuilder(), new PostgresFactory())
        );
        dtoBuilder = new DtoBuilder(new JoiValidator());
        resProvider = new ResponseProvider();

        homeController = new HomeController(homeService, dtoBuilder, logProvider, resProvider);

    });

    it ('has 2 properties', () => expect(Object.keys(homeController).length).toBe(5));
    it ('has 2 function', () => {
        expect(homeController.get).toBeDefined();
        expect(homeController.join).toBeDefined();
        expect(homeController.login).toBeDefined();
    });
    
    it ('extends BaseController, BaseHttpController', () => {

        expect(homeController).toBeInstanceOf(BaseController);
        expect(homeController).toBeInstanceOf(BaseHttpController);

    });

});