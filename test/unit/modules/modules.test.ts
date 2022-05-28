import 'reflect-metadata';
import * as ModuleLoader from '../../../src/modules/module.loader';


describe ('Class Loader', () => {

    it ('has 4 properties', () => {

        expect(Object.keys(ModuleLoader).length).toBe(5);

        
        expect(ModuleLoader.ConfigFactory).toBeDefined();
        expect(ModuleLoader.PostgresFactory).toBeDefined();
        
        expect(ModuleLoader.JoiProvider).toBeDefined();
        expect(ModuleLoader.ResponseProvider).toBeDefined();

    });

});