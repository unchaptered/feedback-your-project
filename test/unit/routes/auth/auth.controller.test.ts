import 'reflect-metadata';
import { BaseHttpController } from 'inversify-express-utils';

// Testing Module
import { AuthController } from '../../../../src/routes/controller.loader';
import { BaseController } from '../../../../src/routes/base/base.controller';

import { AuthRepository } from '../../../../src/routes/repository.loader';
import { AuthService } from '../../../../src/routes/service.loader';
import { DevQueryBuilder, DtoBuilder, JoiValidator, LoggerProvider, PostgresFactory, ResponseProvider, TokenFactory } from '../../../../src/modules/module.loader';


describe ('Auth Controller', () => {

    // Layer
    let authService: AuthService;

    // Module
    let dtoBuilder: DtoBuilder;
    let logProvider: LoggerProvider;
    let resProvider: ResponseProvider;

    // Testing Module
    let authController: AuthController;

    beforeAll(() => {
        logProvider = new LoggerProvider();
        authService = new AuthService(
            new AuthRepository(new DevQueryBuilder(), new PostgresFactory()),
            new TokenFactory(),
            new ResponseProvider()
        );
        dtoBuilder = new DtoBuilder(new JoiValidator());
        resProvider = new ResponseProvider();
        
        authController = new AuthController(authService, dtoBuilder, logProvider, resProvider);
    });

    it ('has 2 properties', () => expect(Object.keys(authController).length).toBe(5));
    it ('has 2 functions', () => {
        expect(authController.publishToken).toBeDefined();
        expect(authController.republishAccessToken).toBeDefined();
    });

    it ('extends BaseController, BaseHttpController', () => {

        expect(authController).toBeInstanceOf(BaseController);
        expect(authController).toBeInstanceOf(BaseHttpController);

    });

});