import 'reflect-metadata';
import * as serviceLoader from '../../../src/routes/service.loader';

describe ('Service Loader', () => {
    
    it ('has 2 func', () => {

        expect(Object.keys(serviceLoader).length).toBe(1);

        expect(serviceLoader.HomeService).toBeDefined();

    });

});
