import 'reflect-metadata';
import * as repositoryLoader from '../../../src/routes/repository.loader';

describe ('Repository Loader', () => {
    
    it ('has 2 Repository', () => {

        expect(Object.keys(repositoryLoader).length).toBe(2);

        expect(repositoryLoader.HomeRepository).toBeDefined();
        expect(repositoryLoader.AuthRepository).toBeDefined();

    });

});
