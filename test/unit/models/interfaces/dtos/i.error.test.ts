import 'reflect-metadata';

// Testing Module
import { ICustomException } from '../../../../../src/models/interface.loader';

// Creator
import mockCreator from '../../../../mock/mock.creator';


describe ('ICustomException', () => {

    it ('has 3 properties, without iterator', () => {

        const customException: ICustomException = mockCreator.iCustomException.createICustomException();

        expect(customException.message).toBeDefined();
        expect(customException.name).toBeDefined();
        expect(customException.statusCode).toBeDefined();

        expect(customException.stack).not.toBeDefined();

    });

});