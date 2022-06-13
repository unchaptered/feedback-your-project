import 'reflect-metadata';
import * as CLassLoader from '../../../src/models/class.loader';


describe ('Class Loader', () => {

    it ('has 19 properties', () => {
        
        expect(Object.keys(CLassLoader).length).toBe(19);

        // Config
        expect(CLassLoader.Config).toBeDefined();

        // Form
        expect(CLassLoader.Form).toBeDefined();
        expect(CLassLoader.SuccessForm).toBeDefined();
        expect(CLassLoader.FailureForm).toBeDefined();
        
        // Exception
        expect(CLassLoader.CustomException).toBeDefined();
        expect(CLassLoader.BadRequestException).toBeDefined();
        expect(CLassLoader.NotFoundException).toBeDefined();
        expect(CLassLoader.ConflictException).toBeDefined();
        expect(CLassLoader.IntervalServerError).toBeDefined();
        expect(CLassLoader.UnkownServerError).toBeDefined();

        // Dtos
        expect(CLassLoader.Dev).toBeDefined();
        expect(CLassLoader.DevForJoin).toBeDefined();
        expect(CLassLoader.DevForLogin).toBeDefined();
        expect(CLassLoader.DevForToken).toBeDefined();

    });

});