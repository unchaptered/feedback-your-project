import 'reflect-metadata';
import * as ModuleLoader from '../../../src/modules/module.loader';


describe ('Class Loader', () => {

    it ('has 9 properties', () => {

        expect(Object.keys(ModuleLoader).length).toBe(9);
        
        // Builders
        expect(ModuleLoader.DevQueryBuilder).toBeDefined();
        expect(ModuleLoader.DtoBuilder).toBeDefined();

        // Factories
        expect(ModuleLoader.TokenFactory).toBeDefined();
        expect(ModuleLoader.ConfigFactory).toBeDefined();
        expect(ModuleLoader.PostgresFactory).toBeDefined();
    
        // Providers
        expect(ModuleLoader.LoggerProvider).toBeDefined();
        expect(ModuleLoader.ResponseProvider).toBeDefined();
        
        // Validators
        expect(ModuleLoader.JoiValidator).toBeDefined();

    });

});