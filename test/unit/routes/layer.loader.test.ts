import 'reflect-metadata';
import * as layerLoader from '../../../src/routes/layer.loader';

describe ('Service Loader', () => {
    
    it ('has 2 Service', () => {

        expect(Object.keys(layerLoader).length).toBe(10);

        expect(layerLoader.HomeController).toBeDefined();
        expect(layerLoader.AuthController).toBeDefined();
        expect(layerLoader.SiteController).toBeDefined();
        expect(layerLoader.FeedbackController).toBeDefined();

        expect(layerLoader.HomeService).toBeDefined();
        expect(layerLoader.AuthService).toBeDefined();
        expect(layerLoader.SiteService).toBeDefined();
        
        expect(layerLoader.HomeRepository).toBeDefined();
        expect(layerLoader.AuthRepository).toBeDefined();
        expect(layerLoader.SiteRepository).toBeDefined();

    });

});
