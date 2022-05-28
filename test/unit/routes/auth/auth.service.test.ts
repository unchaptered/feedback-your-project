import 'reflect-metadata';
import { AuthRepository } from '../../../../src/routes/repository.loader';
import { AuthService } from '../../../../src/routes/service.loader';


describe ('Auth Service', () => {
    
    let authRepository: AuthRepository;
    let authService: AuthService;

    beforeEach(() => {
        authRepository = new AuthRepository();
        authService = new AuthService(authRepository);
    });

    describe ('properties', () => {

        it ('has 1 func', () => {

            expect(Object.keys(authService).length).toBe(1);
            
            expect(authService.get).toBeDefined();
            
        });

    });

    describe ('logics', () => {

        beforeEach(() => {
            authRepository.get = jest.fn();
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it ('this.get call repository.get', () => {

            authService.get();

            expect(authRepository.get).toBeCalledTimes(1);
            
        });

    });

});