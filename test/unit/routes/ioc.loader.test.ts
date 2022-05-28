import 'reflect-metadata';
import * as loader from '../../../src/routes/ioc.loader';

describe ('loader', () => {
    
    it ('ioc files has no properties', () => {

        expect(Object.keys(loader).length).toBe(0);

    });

});
