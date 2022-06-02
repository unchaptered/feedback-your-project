import { GUARDS } from '../../../src/constants/constant.loader';


describe ('filters symbol', () => {

    it ('has 2 properties', () => {

        expect(Object.keys(GUARDS).length).toBe(2);

        expect(GUARDS.accessToken).toBeDefined();
        expect(GUARDS.refreshToken).toBeDefined();

    });
    
});