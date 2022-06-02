import 'reflect-metadata';

// Testing Module
import { AuthController } from '../../../../src/routes/controller.loader';
import { AuthRepository } from '../../../../src/routes/repository.loader';
import { AuthService } from '../../../../src/routes/service.loader';
import { DevQueryBuilder, LoggerProvider, PostgresFactory, ResponseProvider, TokenFactory } from '../../../../src/modules/module.loader';


describe ('Auth Controller', () => {

    let logProvider: LoggerProvider;
    let authService: AuthService;
    let authController: AuthController;

    beforeAll(() => {
        logProvider = new LoggerProvider();
        authService = new AuthService(
            new AuthRepository(new DevQueryBuilder(), new PostgresFactory()),
            new TokenFactory(),
            new ResponseProvider()
        );
        authController = new AuthController(logProvider, authService);
    });

    it ('has 2 properties', () => expect(Object.keys(authController).length).toBe(2));
    it ('has 2 functions', () => {
        expect(authController.publishToken).toBeDefined();
        expect(authController.republishAccessToken).toBeDefined();
    });

});