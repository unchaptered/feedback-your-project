import 'reflect-metadata';
import { QueryResult } from 'pg';

// Testing Module
import { BaseLayer } from '../../../../src/routes/base/base.layer';
import { AuthService, AuthRepository } from '../../../../src/routes/layer.loader';
import { TokenFactory, ResponseProvider, DevQueryBuilder, PostgresFactory } from '../../../../src/modules/module.loader';


describe ('Auth Service', () => {

    let authRepsotitory: AuthRepository;
    let tokenFactory: TokenFactory;
    let resProvider: ResponseProvider;

    // Testing Module
    let authService: AuthService;

    beforeAll(() => {

        authRepsotitory = new AuthRepository( new DevQueryBuilder(), new PostgresFactory() );
        tokenFactory = new TokenFactory();
        resProvider = new ResponseProvider();
        authService = new AuthService( authRepsotitory, tokenFactory, resProvider );

    });

    it ('has 3 properties', () => expect(Object.keys(authService).length).toBe(4));
    it ('has 1 function', () => expect(authService.publishToken).toBeDefined());
    it ('extends BaseLayer', () => expect(authService).toBeInstanceOf(BaseLayer));
    
});