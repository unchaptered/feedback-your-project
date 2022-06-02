import { DotenvConfigOptions, DotenvConfigOutput } from 'dotenv';

// Testing Modules
import * as ConfigPrivate from '../../../../../src/modules/factories/private/config.private';

// Dto & Creator
import { IConfig } from '../../../../../src/models/interface.loader';
import mockCreator from '../../../../mock/mock.creator';

describe ('Extracted Functions for Testing to ConfigFactory', () => {

    it ('has 3 properties', () => {

        expect(Object.keys(ConfigPrivate).length).toBe(3);

        expect(ConfigPrivate.getOptionInstance).toBeDefined();
        expect(ConfigPrivate.setConfigPathByOption).toBeDefined();
        expect(ConfigPrivate.getConfigInstance).toBeDefined();
        
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
    
});
