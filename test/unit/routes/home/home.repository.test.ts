import 'reflect-metadata';
import { HomeRepository } from '../../../../src/routes/repository.loader';


describe ('Home Repository', () => {
    
    let homeRepository: HomeRepository;

    beforeEach(() => {
        homeRepository = new HomeRepository();
    });

    describe ('properties', () => {

        it ('has 1 func', () => {

            expect(Object.keys(homeRepository).length).toBe(0);
            
            expect(homeRepository.get).toBeDefined();

        });

    });

    describe ('logics', () => {

        it ('this.get return \'auth\'', () => {

            const reuslt = homeRepository.get();

            expect(typeof reuslt).toBe('string');
            
        });

    });


});