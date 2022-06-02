// Testing Module
import { ISite } from '../../../../../src/models/interface.loader';

// Creator
import mockCreator from '../../../../mock/mock.creator';


describe ('ISite', () => {

    let iSite: ISite;

    beforeAll(() => iSite = mockCreator.Service.iSite.createISite());

    it ('has 5 properties', () => expect(Object.keys(iSite).length).toBe(5));

});