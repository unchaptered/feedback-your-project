import 'reflect-metadata';
import * as controllerLoader from '../../../src/routes/controller.loader';


describe ('Controller Loader', () => {
    
    it ('has 4 func', () => {

        expect(1).toBe(1);
        expect(Object.keys(controllerLoader).length).toBe(4);

        expect(controllerLoader.HomeController).toBeDefined();
        expect(controllerLoader.AuthController).toBeDefined();
        expect(controllerLoader.AdminController).toBeDefined();
        expect(controllerLoader.FeedbackController).toBeDefined();

    });

});
