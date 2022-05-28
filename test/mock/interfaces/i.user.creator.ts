import * as faker from 'faker';

// Mock Target
import { IUser, IUserDetail } from '../../../src/models/interface.loader';

export const createIUserDetail = (): IUserDetail => {
    const password = faker.internet.password().substring(1, 10);

    return {
        id: faker.random.number(),
        email: faker.internet.email().substring(1, 10),
        username: faker.internet.userName().substring(1, 10),
        password, passwordConfirm: password
    };

};

export const createIUser = (): IUser => {

    return {
        id: faker.random.number(),
        email: faker.internet.email().substring(1, 10),
        password: faker.internet.password().substring(1, 10)
    };

}