import 'reflect-metadata';

// Testing Targets
import { Dev, DevForJoin, DevForLogin, DevForToken } from '../../../../../src/models/class.loader';
import mockCreator from '../../../../mock/mock.creator';


describe ('Dev', () => {

    it ('Dev has 4 properties', () => {
    
        const iDev = mockCreator.Service.iDev.createIDev(10);
        const dev = new Dev(iDev);
    
        expect(Object.keys(dev).length).toBe(4);
    
        expect(dev.id).toBeDefined();
        expect(dev.email).toBeDefined();
        expect(dev.name).toBeDefined();
        expect(dev.password).toBeDefined();
    
        expect(Dev.joiObject).toBeDefined();
    
    });
    
    it ('DevForJoin has 4 properties', () => {
        
        const iDev = mockCreator.Service.iDev.createIDevForJoin();
        const dev = new DevForJoin(iDev);
    
        expect(Object.keys(dev).length).toBe(4);
    
        expect(dev.email).toBeDefined();
        expect(dev.name).toBeDefined();
        expect(dev.password).toBeDefined();
        expect(dev.passwordConfirm).toBeDefined();
    
        expect(DevForJoin.joiObject).toBeDefined();
    
    });
    
    it ('DevForLogin has 2 properties', () => {
        
        const iDev = mockCreator.Service.iDev.createIDevForLogin();
        const dev = new DevForLogin(iDev);
    
        expect(Object.keys(dev).length).toBe(2);
    
        expect(dev.email).toBeDefined();
        expect(dev.password).toBeDefined();
    
        expect(DevForLogin.joiObject).toBeDefined();
    
    });
    
    
    it ('DevForToken has 2 properties', () => {
        
        const iDev = mockCreator.Service.iDev.createIDevForToken(10, true);
        const dev = new DevForToken(iDev);
    
        expect(Object.keys(dev).length).toBe(3);
    
        expect(dev.id).toBeDefined();
        expect(dev.email).toBeDefined();
        expect(dev.password).toBeDefined();
    
        expect(DevForToken.joiObject).toBeDefined();
    
    });

});