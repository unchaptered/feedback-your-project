import 'reflect-metadata';
import * as serviceLoader from '../../../src/routes/service.loader';

describe ('Service Loader', () => {
    
    it ('has 2 Service', () => {

        expect(Object.keys(serviceLoader).length).toBe(2);

        expect(serviceLoader.HomeService).toBeDefined();
        expect(serviceLoader.AuthService).toBeDefined();

    });

});
