import * as ConstantLoader from '../../../src/constants/constant.loader';


describe ('Constant Loader', () => {

    it ('has 10 properties', () => {

        expect(Object.keys(ConstantLoader).length).toBe(10);

        // Paths
        expect(ConstantLoader.PATHS).toBeDefined();
        
        // Classes
        expect(ConstantLoader.CLASSES).toBeDefined();
        
            // Middlewares
            expect(ConstantLoader.GUARDS).toBeDefined();

            // Modules
            expect(ConstantLoader.BUILDERS).toBeDefined();
            expect(ConstantLoader.FACTORIES).toBeDefined();
            expect(ConstantLoader.PROVIDERS).toBeDefined();
            expect(ConstantLoader.VALIDATORS).toBeDefined();

            // Services
            expect(ConstantLoader.CONTROLLERS).toBeDefined();
            expect(ConstantLoader.REPOSITORIES).toBeDefined();
            expect(ConstantLoader.SERVICES).toBeDefined();

    });

});