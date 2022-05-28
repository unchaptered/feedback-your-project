import { FILTERS } from '../../../src/constants/filter.symbol';


describe ('filters symbol', () => {

    it ('has 2 properties', () => {

        expect(FILTERS.Join).toBeDefined();
        expect(FILTERS.Login).toBeDefined();

    });
    
});

