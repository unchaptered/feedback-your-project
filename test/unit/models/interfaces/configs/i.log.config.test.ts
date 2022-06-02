// Testing Module
import { ILogConfig } from '../../../../../src/models/interface.loader';

// Creator
import mockCreator from '../../../../mock/mock.creator';


describe ('ILogConfig', () => {

    it ('has 2 properties, with iterator', () => {

        const logConfig: ILogConfig = mockCreator.Config.iLogConfig.createILogConf();

        expect(logConfig.DIR).toBeDefined();
        expect(logConfig[Symbol.iterator]).toBeDefined();

    });

});