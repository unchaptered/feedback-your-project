import * as ConstantLoader from '../../../src/constants/constant.loader';


describe ('Constant Loader', () => {

    it ('has 5 properties', () => expect(Object.keys(ConstantLoader).length).toBe(5));

});