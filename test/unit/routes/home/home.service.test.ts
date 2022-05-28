import 'reflect-metadata';
import { HomeRepository } from '../../../../src/routes/repository.loader';
import { HomeService } from '../../../../src/routes/service.loader';


describe ('Home Service', () => {
    
    let homeRepository: HomeRepository;
    let homeService: HomeService;

    beforeEach(() => {
        homeRepository = new HomeRepository();
        homeService = new HomeService(homeRepository);
    });

    describe ('properties', () => {

        it ('has 1 func', () => {

            expect(Object.keys(homeService).length).toBe(1);
            
            expect(homeService.get).toBeDefined();

        });

    });
    
    describe ('logics', () => {

        beforeEach(() => {
            homeRepository.get = jest.fn();
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it ('this.get call repository.get', () => {

            homeService.get();

            expect(homeRepository.get).toBeCalledTimes(1);
            
        });

    });

});