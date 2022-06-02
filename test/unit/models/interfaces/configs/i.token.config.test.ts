// Testing Module
import { ITokenConfig } from '../../../../../src/models/interface.loader';

// Creator
import mockCreator from '../../../../mock/mock.creator';


describe ('ITokenConfig', () => {

    it ('has 5 properties, with iterator', () => {

        const tokenConfig: ITokenConfig = mockCreator.Config.iTokenConfig.createITokenConf();

        expect(tokenConfig.SECRET).toBeDefined();
        expect(tokenConfig.ALGORITHM).toBeDefined();
        expect(tokenConfig.ACCESS_EXPIRED).toBeDefined();
        expect(tokenConfig.REFRESH_EXPIRED).toBeDefined();
        expect(tokenConfig[Symbol.iterator]).toBeDefined();

    });

});