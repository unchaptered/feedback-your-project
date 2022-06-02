import { PATHS } from '../../../src/constants/constant.loader';

describe ('path enum', () => {

    it ('has 4 properties', () => {
        
        expect(Object.keys(PATHS).length).toBe(4);

        expect(PATHS.Home).toBeDefined();
        expect(PATHS.Auth).toBeDefined();
        expect(PATHS.Admin).toBeDefined();
        expect(PATHS.Feedback).toBeDefined();
        
    });

});