import { PATHS } from '../../../src/constants/constant.loader';


describe ('PATHS', () => {

    it ('has 4 props', () => {

        expect(PATHS.Home).toBeDefined();
        expect(PATHS.Auth).toBeDefined();
        expect(PATHS.Admin).toBeDefined();
        expect(PATHS.Feedback).toBeDefined();
        
    });

});