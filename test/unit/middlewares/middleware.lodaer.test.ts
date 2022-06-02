import 'reflect-metadata';
import * as MiddlewareLodaer from '../../../src/middlewares/middleware.loader';


describe ('Middleware Lodaer', () => {

    it ('has 5 properties', () => {
        
        expect(Object.keys(MiddlewareLodaer).length).toBe(5);

        expect(MiddlewareLodaer.IDevForJoinFilter).toBeDefined();
        expect(MiddlewareLodaer.IDevForLoginFilter).toBeDefined();
        expect(MiddlewareLodaer.IDevForTokenFilter).toBeDefined();

        expect(MiddlewareLodaer.AccessTokenGuard).toBeDefined();
        expect(MiddlewareLodaer.RefreshTokenGuard).toBeDefined();

    });

});