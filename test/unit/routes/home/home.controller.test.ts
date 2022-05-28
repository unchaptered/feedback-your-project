import 'reflect-metadata';
import { HomeController } from '../../../../src/routes/controller.loader';
import { HomeRepository } from '../../../../src/routes/repository.loader';
import { HomeService } from '../../../../src/routes/service.loader';

import { JoiProvider, LoggerProvider, ResponseProvider } from '../../../../src/modules/module.loader';


describe ('Home Controller', () => {
    
    let homeRepository: HomeRepository;
    let homeService: HomeService;

    let joiProvider: JoiProvider;
    let logProvider: LoggerProvider;
    let responseProvider: ResponseProvider;

    let homeController: HomeController;

    beforeEach(() => {
        homeRepository = new HomeRepository();
        homeService = new HomeService(homeRepository);

        joiProvider = new JoiProvider();
        logProvider = new LoggerProvider();
        responseProvider = new ResponseProvider();

        homeController = new HomeController(joiProvider, logProvider, responseProvider, homeService);
    });

    describe ('properties', () => {

        it ('4 keys', () => {

            expect(Object.keys(homeController).length).toBe(4);

        });

        it ('3 public func', () => { 
            
            expect(homeController.get).toBeDefined();
            expect(homeController.join).toBeDefined();
            expect(homeController.login).toBeDefined();

        });

    });

    
    describe ('logics', () => {

        beforeEach(() => {
            homeService.get = jest.fn();
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it ('this.get call repository.get', () => {

            homeController.get();

            expect(homeService.get).toBeCalledTimes(1);
            
        });

    });

});