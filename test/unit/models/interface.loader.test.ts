import * as InterfaceLoader from '../../../src/models/interface.loader';

describe ('Interface Loader', () => {

    it ('have 0 properties', () => {

        expect(Object.keys(InterfaceLoader).length).toBe(0);

    });

});