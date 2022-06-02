// Testing Module
import { Config } from '../../../../../src/models/class.loader';


describe ('Config', () => {

    it ('is @@iterable implementation body of Config', () => {

        expect(Object.keys(Config).length).toBe(0);

    });

});