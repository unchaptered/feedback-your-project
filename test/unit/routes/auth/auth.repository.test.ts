import 'reflect-metadata';
import { AuthRepository } from '../../../../src/routes/repository.loader';


describe ('Auth Repository', () => {
    
    let authRepository: AuthRepository;

    beforeEach(() => {
        authRepository = new AuthRepository();
    });

    describe ('properties', () => {

        it ('has 1 func', () => {

            expect(Object.keys(authRepository).length).toBe(0);
            
            expect(authRepository.get).toBeDefined();

        });

    });

    describe ('logics', () => {

        it ('this.get return \'auth\'', () => {

            const reuslt = authRepository.get();

            expect(typeof reuslt).toBe('string');
            
        });

    });

});