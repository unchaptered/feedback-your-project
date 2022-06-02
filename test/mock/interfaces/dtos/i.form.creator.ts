import * as faker from 'faker';

// Mock Target
import { IForm } from '../../../../src/models/interface.loader';


export const createIForm = (): IForm => {

    return {
        isSuccess: faker.random.boolean(),
        message: faker.random.word(),
        result: faker.random.objectElement()
    };

};