import 'reflect-metadata';

// Dto
import { IConfig } from '../../../../src/models/interface.loader';

// Testing Module
import { ConfigFactory } from '../../../../src/modules/factories/config.factory';

// Extract Private Function
import * as ConfigPrivate from '../../../../src/modules/factories/private/config.private';
jest.spyOn(ConfigPrivate, 'getOptionInstance');
jest.spyOn(ConfigPrivate, 'setConfigPathByOption');
jest.spyOn(ConfigPrivate, 'getConfigInstance');

describe ('Config Factory', () => {


    it ('has 1 static props', () => expect(Object.keys(ConfigFactory).length).toBe(1));
    it ('has 0 props', () => {
        const tmp = new ConfigFactory();
        expect(Object.keys(tmp).length).toBe(0);
    });


    describe('logics', () => {        

        let conFactory: ConfigFactory;

        beforeAll(() => conFactory = new ConfigFactory());
        afterEach(() => jest.clearAllMocks());

        describe ('static initialize', () => {

            it ('should call 3 private func', () => {
    
                const MODE = 'dev';
                ConfigFactory.initialize(MODE);
    
                expect(ConfigPrivate.getOptionInstance).toBeCalledTimes(1);
                expect(ConfigPrivate.setConfigPathByOption).toBeCalledTimes(1);
                expect(ConfigPrivate.getConfigInstance).toBeCalledTimes(1);
    
            });
    
            it ('should return IConfig', async () => {
    
                const MODE = 'dev';
        
                const config: IConfig | null = await ConfigFactory.initialize(MODE);
        
                if (config !== null) {
    
                    expect(config.PORT).toBeDefined();
    
                    expect(config.LOG_CONF).toBeDefined();
                    expect(config.LOG_CONF.DIR).toBeDefined();
                    expect(config.LOG_CONF[Symbol.iterator]).toBeDefined();
        
                    expect(config.POOL_CONF).toBeDefined();
                    expect(config.POOL_CONF.HOST).toBeDefined();
                    expect(config.POOL_CONF.USER).toBeDefined();
                    expect(config.POOL_CONF.DATABASE).toBeDefined();
                    expect(config.POOL_CONF.PASSWORD).toBeDefined();
                    expect(config.POOL_CONF.PORT).toBeDefined();
                    expect(config.POOL_CONF[Symbol.iterator]).toBeDefined();
        
                    expect(config.TOKEN_CONF).toBeDefined();
                    expect(config.TOKEN_CONF.SECRET).toBeDefined();
                    expect(config.TOKEN_CONF.ALGORITHM).toBeDefined();
                    expect(config.TOKEN_CONF.ACCESS_EXPIRED).toBeDefined();
                    expect(config.TOKEN_CONF.REFRESH_EXPIRED).toBeDefined();
                    expect(config.TOKEN_CONF[Symbol.iterator]).toBeDefined();
        
                    expect(config[Symbol.iterator]).toBeDefined();
    
                }
    
            });
    
            it ('should return same IConfig', async () => {
    
                const MODE = 'dev';
        
                const config1: IConfig | null = await ConfigFactory.initialize(MODE);
                const config2: IConfig | null = await ConfigFactory.initialize(MODE);
        
                expect(config1).toBe(config2);
    
            });

        });

    });


});