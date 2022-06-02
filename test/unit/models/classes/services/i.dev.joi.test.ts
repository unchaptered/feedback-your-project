import 'reflect-metadata';

// Testing Module
import { JoiIDevForLogin, JoiIDevForJoin, JoiIDevForToken } from '../../../../../src/models/class.loader';


describe ('Joy', () => {

    it ('JoiIDevForLogin must be defined', () => expect(JoiIDevForLogin).toBeDefined());
    it ('JoiIDevForJoin must be defined', () => expect(JoiIDevForJoin).toBeDefined());
    it ('JoiIDevForToken must be defined', () => expect(JoiIDevForToken).toBeDefined());


});