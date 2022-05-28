import * as CLassLoader from '../../../src/models/class.loader';


describe ('Class Loader', () => {

    it ('has 4 properties', () => {

        expect(Object.keys(CLassLoader).length).toBe(4);

        expect(CLassLoader.Config).toBeDefined();
        expect(CLassLoader.Form).toBeDefined();
        expect(CLassLoader.SuccessForm).toBeDefined();
        expect(CLassLoader.FailureForm).toBeDefined();

    });

});