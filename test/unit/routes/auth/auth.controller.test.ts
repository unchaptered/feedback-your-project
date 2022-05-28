import 'reflect-metadata';
import { AuthController } from '../../../../src/routes/controller.loader';

describe ('Auth Controller', () => {

    let authController: AuthController;

    beforeEach(() => {

        authController = new AuthController();
    });
    
    it ('has 2 funcs', () => {

        expect(authController.readAccessToken).toBeDefined();
        expect(authController.createAccessToken).toBeDefined();

    });

});