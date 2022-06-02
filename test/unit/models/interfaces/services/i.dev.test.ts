// Testing Module
import { IDev, IDevForJoin, IDevForLogin, IDevForToken } from '../../../../../src/models/interface.loader';

// Creator
import mockCreator from '../../../../mock/mock.creator';


describe ('IDev', () => {

    let iDev: IDev;
    let iDevForJoin: IDevForJoin;
    let iDevForLogin: IDevForLogin;
    let iDevForToken: IDevForToken;


    beforeAll(() => {
        iDev = mockCreator.Service.iDev.createIDev(3);
        iDevForJoin = mockCreator.Service.iDev.createIDevForJoin();
        iDevForLogin = mockCreator.Service.iDev.createIDevForLogin();
        iDevForToken = mockCreator.Service.iDev.createIDevForToken(true, 3);
    });

    it ('IDev has 4 properties', () => expect(Object.keys(iDev).length).toBe(4));
    it ('IDevForJoin has 4 properties', () => expect(Object.keys(iDevForJoin).length).toBe(4));
    it ('IDevForLogin has 2 properties', () => expect(Object.keys(iDevForLogin).length).toBe(2));
    it ('IDevForToken has 3 properties', () => expect(Object.keys(iDevForToken).length).toBe(3));

});