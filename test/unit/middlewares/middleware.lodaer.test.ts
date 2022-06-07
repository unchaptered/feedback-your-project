import 'reflect-metadata';
import * as MiddlewareLodaer from '../../../src/middlewares/middleware.loader';


describe ('Middleware Lodaer', () => {

    it ('has 2 properties', () => {
        
        expect(Object.keys(MiddlewareLodaer).length).toBe(2);

        expect(MiddlewareLodaer.AccessTokenGuard).toBeDefined();
        expect(MiddlewareLodaer.RefreshTokenGuard).toBeDefined();

    });

});