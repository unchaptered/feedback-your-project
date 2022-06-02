import { JOYS } from '../../../src/constants/constant.loader';


describe ('filters symbol', () => {

    it ('has 3 properties', () => {

        expect(Object.keys(JOYS).length).toBe(3);

        expect(JOYS.iDevForJoin).toBeDefined();
        expect(JOYS.iDevForLogin).toBeDefined();
        expect(JOYS.iDevForToken).toBeDefined();

    });
    
});