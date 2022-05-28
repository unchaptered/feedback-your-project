// Dto
import { IConfig } from '../../../../src/models/interface.loader';

// Testing Module
import { ConfigFactory } from '../../../../src/modules/factories/config.factory';

// Extract Private Function
import * as ConfigPrivate from '../../../../src/modules/factories/private/config.private';
jest.spyOn(ConfigPrivate, 'getOptionInstance');
jest.spyOn(ConfigPrivate, 'setConfigPathByOption');
jest.spyOn(ConfigPrivate, 'getConfigInstance');
jest.spyOn(ConfigPrivate, 'isValidOfConfig');

describe ('Config Factory', () => {

    let conFactory: ConfigFactory;

    beforeAll(() => {
        conFactory = new ConfigFactory();
    });

    afterEach(() => {
        jest.clearAllMocks();
        ConfigFactory.config = null;
    });

    describe ('properties', () => {

        it ('2 static value', () => {
            expect(Object.keys(ConfigFactory).length).toBe(2);

            expect(ConfigFactory.config).toBeDefined();
            expect(ConfigFactory.initialize).toBeDefined();
        });

    });

    describe ('initialize should call 4 private func', () => {

        it ('any should call 4 func', () => {

            const MODE = 'dev';
            ConfigFactory.initialize(MODE);

            expect(ConfigPrivate.getOptionInstance).toBeCalledTimes(1);
            expect(ConfigPrivate.setConfigPathByOption).toBeCalledTimes(1);
            expect(ConfigPrivate.getConfigInstance).toBeCalledTimes(1);
            expect(ConfigPrivate.isValidOfConfig).toBeCalledTimes(1);

        });
        
    });

    describe ('initialize should return IConfig | null', () => {
    
        it ('any should return IConfig', () => {
    
            const MODE = 'dev';
    
            const config: IConfig | null = ConfigFactory.initialize(MODE);
    
            expect(config).not.toBeNull();
            expect(config?.PORT).toBeDefined();
            expect(config?.PG_POOL?.HOST).toBeDefined();
            expect(config?.PG_POOL?.USER).toBeDefined();
            expect(config?.PG_POOL?.DATABASE).toBeDefined();
            expect(config?.PG_POOL?.PASSWORD).toBeDefined();
            expect(config?.PG_POOL?.PORT).toBeDefined();
    
        });

    });

    describe ('initialize should return same ICofig', () => {

        it ('Consecutive call is not useful', () => {
            const MODE = 'dev';
    
            const config1: IConfig | null = ConfigFactory.initialize(MODE);
            const config2: IConfig | null = ConfigFactory.initialize(MODE);
    
            expect(config1).toBe(config2);
        });

    });

});