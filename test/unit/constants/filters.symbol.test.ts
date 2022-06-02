import { FILTERS } from '../../../src/constants/constant.loader';


describe ('filters symbol', () => {

    it ('has 3 properties', () => {

        expect(Object.keys(FILTERS).length).toBe(3);
        
        expect(FILTERS.IDevForJoin).toBeDefined();
        expect(FILTERS.IDevForLogin).toBeDefined();
        expect(FILTERS.IDevForToken).toBeDefined();

    });
    
});