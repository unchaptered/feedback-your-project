import 'reflect-metadata';
import * as repositoryLoader from '../../../src/routes/repository.loader';

describe ('Repository Loader', () => {
    
    it ('has 2 func', () => {

        expect(Object.keys(repositoryLoader).length).toBe(1);

        expect(repositoryLoader.HomeRepository).toBeDefined();

    });

});
