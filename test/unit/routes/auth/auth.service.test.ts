import 'reflect-metadata';
import { QueryResult } from 'pg';

// Testing Module
import { AuthService } from '../../../../src/routes/service.loader';
import { AuthRepository } from '../../../../src/routes/repository.loader';
import { TokenFactory, ResponseProvider, DevQueryBuilder, PostgresFactory } from '../../../../src/modules/module.loader';

// Dtos & Creator
import { IDevForToken } from '../../../../src/models/interface.loader';
import { BadRequestException, FailureForm, NotFoundException, SuccessForm } from '../../../../src/models/class.loader';
import mockCreator from '../../../mock/mock.creator';


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

    it ('has 3 properties', () => expect(Object.keys(authService).length).toBe(3));
    it ('has 1 function', () => expect(authService.publishToken).toBeDefined());
    
});