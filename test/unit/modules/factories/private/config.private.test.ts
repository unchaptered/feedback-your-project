import { DotenvConfigOptions, DotenvConfigOutput } from 'dotenv';

// Testing Modules
import * as ConfigPrivate from '../../../../../src/modules/factories/private/config.private';

// Dto & Creator
import { IConfig } from '../../../../../src/models/interface.loader';
import mockCreator from '../../../../mock/mock.creator';

describe ('Extracted Functions for Testing to ConfigFactory', () => {

    it ('has 4 properties', () => {

        expect(Object.keys(ConfigPrivate).length).toBe(4);

        expect(ConfigPrivate.getOptionInstance).toBeDefined();
        expect(ConfigPrivate.setConfigPathByOption).toBeDefined();
        expect(ConfigPrivate.getConfigInstance).toBeDefined();
        expect(ConfigPrivate.isValidOfConfig).toBeDefined();
        
    });

    describe ('getOptionInstance', () => {

        it ('should return DotenvConfigOptions', () => {

            const option: DotenvConfigOptions = ConfigPrivate.getOptionInstance('any');
            expect(option).toBeDefined();
            expect(option?.path).toBeDefined();

        });

        it ('dev should connect to .env.dev', () => {
            const option: DotenvConfigOptions = ConfigPrivate.getOptionInstance('dev');
            expect(option).toBeDefined();
            expect(option?.path).toBe('.env.dev');
        });
        it ('test should connect to .env.test', () => {
            const option: DotenvConfigOptions = ConfigPrivate.getOptionInstance('test');
            expect(option).toBeDefined();
            expect(option?.path).toBe('.env.test');
        });
        it ('prod should connect to .env.prod', () => {
            const option: DotenvConfigOptions = ConfigPrivate.getOptionInstance('prod');
            expect(option).toBeDefined();
            expect(option?.path).toBe('.env.prod');
        });

    });
    
    describe ('setConfigPathByOption', () => {

        it ('setConfigPathByOption', () => {

            const option: DotenvConfigOptions = ConfigPrivate.getOptionInstance('test');
            expect(option).toBeDefined();
            expect(option?.path).toBe('.env.test');

            const path: DotenvConfigOutput = ConfigPrivate.setConfigPathByOption(option);
            expect(path).toBeDefined();
            expect(path?.parsed).toBeDefined();
            
        });

    });

    describe ('isValidOfConfig', () => {

        it ('if value === undefined, return false 1', () => {

            const config: IConfig = mockCreator.iConfig.craeteIConfig();
            if (config) config.PORT = undefined;

            const isValid: boolean = ConfigPrivate.isValidOfConfig(config);
            expect(isValid).toBeFalsy();
            
        });

        it ('if value === undefined, return false 2', () => {

            const config: IConfig = mockCreator.iConfig.craeteIConfig();
            if (config.PG_POOL) config.PG_POOL.PORT = undefined;

            const isValid: boolean = ConfigPrivate.isValidOfConfig(config);
            expect(isValid).toBeFalsy();
            
        });

        it ('if value !== undefined, return true', () => {

            const config: IConfig = mockCreator.iConfig.craeteIConfig();

            const isValid: boolean = ConfigPrivate.isValidOfConfig(config);
            expect(isValid).toBeTruthy();
            
        });

    });
    
});
