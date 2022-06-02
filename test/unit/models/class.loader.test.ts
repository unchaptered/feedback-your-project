import 'reflect-metadata';
import * as CLassLoader from '../../../src/models/class.loader';


describe ('Class Loader', () => {

    it ('has 10 properties', () => {

        expect(Object.keys(CLassLoader).length).toBe(10);

        // Configs
        expect(CLassLoader.Config).toBeDefined();

        // Dtos
        expect(CLassLoader.Form).toBeDefined();
        expect(CLassLoader.SuccessForm).toBeDefined();
        expect(CLassLoader.FailureForm).toBeDefined();
        
        expect(CLassLoader.BadRequestException).toBeDefined();
        expect(CLassLoader.ConflictException).toBeDefined();
        expect(CLassLoader.NotFoundException).toBeDefined();

        // Services
        expect(CLassLoader.JoiIDevForJoin).toBeDefined();
        expect(CLassLoader.JoiIDevForLogin).toBeDefined();
        expect(CLassLoader.JoiIDevForToken).toBeDefined();

    });

});