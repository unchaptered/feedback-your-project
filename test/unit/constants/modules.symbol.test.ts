// Testing Module
import { MODULES } from '../../../src/constants/constant.loader';


describe ('modules symbol', () => {

    it ('has 11 properties', () => {

        expect(Object.keys(MODULES).length).toBe(11);
        
        
        expect(MODULES.TokenFactory).toBeDefined();
        expect(MODULES.ConfigFactory).toBeDefined();
        expect(MODULES.PostgresFactory).toBeDefined();

        expect(MODULES.DevQueryBuilder).toBeDefined();

        expect(MODULES.JoiProvider).toBeDefined();
        expect(MODULES.LoggerProvider).toBeDefined();
        expect(MODULES.ResponseProvider).toBeDefined();

        expect(MODULES.HomeService).toBeDefined();
        expect(MODULES.HomeRepository).toBeDefined();

        expect(MODULES.AuthService).toBeDefined();
        expect(MODULES.AuthRepository).toBeDefined();

    });
    
});

