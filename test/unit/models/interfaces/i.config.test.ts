// Testing Module
import { IConfig } from '../../../../src/models/interface.loader';

// dto generator
import mockCreator from '../../../mock/mock.creator';


describe ('IConfig', () => {

    it ('has 3 properties, with iterator', () => {

        const config: IConfig = mockCreator.iConfig.craeteIConfig();
        
        expect(config.PORT).toBeDefined();
        expect(config.PORT).toBeDefined();
        expect(config[Symbol.iterator]).toBeDefined();

    });

});