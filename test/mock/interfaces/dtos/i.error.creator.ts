import * as faker from 'faker';

// Mock Target
import { ICustomException } from '../../../../src/models/interface.loader';


export const createICustomException = (): ICustomException => {

    return {
        name: faker.internet.userName(),
        message: faker.internet.userName(),
        statusCode: 200
    };

};