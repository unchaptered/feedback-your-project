import 'reflect-metadata';
import * as serviceLoader from '../../../src/routes/service.loader';

describe ('Service Loader', () => {
    
    it ('has 2 func', () => {

        expect(Object.keys(serviceLoader).length).toBe(2);

        expect(serviceLoader.AuthService).toBeDefined();
        expect(serviceLoader.HomeService).toBeDefined();

    });

});
