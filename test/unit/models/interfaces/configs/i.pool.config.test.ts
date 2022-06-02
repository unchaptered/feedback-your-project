// Testing Module
import { IPoolConfig } from '../../../../../src/models/interface.loader';

// Creator
import mockCreator from '../../../../mock/mock.creator';


describe ('IPoolConfig', () => {

    it ('has 6 properties, with iterator', () => {

        const poolConfig: IPoolConfig = mockCreator.Config.iPoolConfig.craeteIPoolConfig();

        expect(poolConfig.HOST).toBeDefined();
        expect(poolConfig.USER).toBeDefined();
        expect(poolConfig.DATABASE).toBeDefined();
        expect(poolConfig.PASSWORD).toBeDefined();
        expect(poolConfig.PORT).toBeDefined();
        expect(poolConfig[Symbol.iterator]).toBeDefined();

    });

});