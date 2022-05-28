import { PATHS } from '../../../src/constants/paths.enum';

describe ('path', () => {

    it ('has 2 properties', () => {
        
        expect(PATHS.Home).toBeDefined();
        expect(PATHS.Auth).toBeDefined();
        
    });

});