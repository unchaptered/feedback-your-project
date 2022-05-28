// Testing Module
import { MODULES } from '../../../src/constants/modules.symbol';


describe ('modules symbol', () => {

    it ('has 7 properties', () => {

        expect(MODULES.PostgresFactory).toBeDefined();

        expect(MODULES.JoiProvider).toBeDefined();
        expect(MODULES.ResponseProvider).toBeDefined();
        
        expect(MODULES.AuthService).toBeDefined();
        expect(MODULES.HomeService).toBeDefined();

        expect(MODULES.AuthRepository).toBeDefined();
        expect(MODULES.HomeRepository).toBeDefined();

    });
    
});

