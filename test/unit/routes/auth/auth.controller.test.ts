import 'reflect-metadata';
import { AuthController } from '../../../../src/routes/controller.loader';
import { AuthRepository } from '../../../../src/routes/repository.loader';
import { AuthService } from '../../../../src/routes/service.loader';

import { JoiProvider, LoggerProvider, ResponseProvider } from '../../../../src/modules/module.loader';


describe ('Auth Controller', () => {
    
    let authRepository: AuthRepository;
    let authService: AuthService;

    let joiProvider: JoiProvider;
    let logProvider: LoggerProvider;
    let responseProvider: ResponseProvider;

    let authController: AuthController;

    beforeEach(() => {
        authRepository = new AuthRepository();
        authService = new AuthService(authRepository);

        joiProvider = new JoiProvider();
        responseProvider = new ResponseProvider();

        authController = new AuthController(joiProvider, logProvider, responseProvider, authService);
    });
    
    describe ('properties', () => {

        it ('4 keys', () => {

            expect(Object.keys(authController).length).toBe(4);

        });

        it ('1 public func', () => {
            
            expect(authController.get).toBeDefined();
            
        });

    });

    describe ('logics', () => {

        beforeEach(() => {
            authService.get = jest.fn();
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it ('this.get call service.get', () => {

            authController.get();

            expect(authService.get).toBeCalledTimes(1);
            
        });

    });

});