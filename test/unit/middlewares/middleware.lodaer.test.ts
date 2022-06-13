import 'reflect-metadata';
import * as MiddlewareLodaer from '../../../src/middlewares/middleware.loader';


describe ('Middleware Lodaer', () => {

    it ('has 3 properties', () => {
        
        expect(Object.keys(MiddlewareLodaer).length).toBe(3);

        expect(MiddlewareLodaer.AccessTokenGuard).toBeDefined();
        expect(MiddlewareLodaer.RefreshTokenGuard).toBeDefined();

        expect(MiddlewareLodaer.TokenRepublisherFilter).toBeDefined();

    });

});