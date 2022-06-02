import 'reflect-metadata';
import * as ModuleLoader from '../../../src/modules/module.loader';


describe ('Class Loader', () => {

    it ('has 10 properties', () => {

        expect(Object.keys(ModuleLoader).length).toBe(10);

        // Factories
        expect(ModuleLoader.TokenFactory).toBeDefined();
        expect(ModuleLoader.ConfigFactory).toBeDefined();
        expect(ModuleLoader.PostgresFactory).toBeDefined();

        // Builders
        expect(ModuleLoader.DevQueryBuilder).toBeDefined();
    
        // Providers
        expect(ModuleLoader.JoiProvider).toBeDefined();
        expect(ModuleLoader.LoggerProvider).toBeDefined();
        expect(ModuleLoader.ResponseProvider).toBeDefined();

        // Joi
        expect(ModuleLoader.JoiIDevForLogin).toBeDefined();
        expect(ModuleLoader.JoiIDevForJoin).toBeDefined();
        expect(ModuleLoader.JoiIDevForToken).toBeDefined();

    });

});