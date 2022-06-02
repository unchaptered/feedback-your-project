import * as faker from 'faker';

// Mock Targets
import { IDev, IDevForJoin, IDevForLogin, IDevForToken } from "../../../../src/models/interface.loader";


export const createIDev = (id?: number): IDev => {

    if (id) {
        return {
            id: id,
            email: faker.internet.email().substring(1, 20),
            name: faker.internet.userName().substring(1, 20),
            password: faker.internet.password().substring(1, 20),
        }
    } else {
        return {
            email: faker.internet.email().substring(1, 20),
            name: faker.internet.userName().substring(1, 20),
            password: faker.internet.password().substring(1, 20),
        };
    }

};

export const createIDevForJoin = (isValid: boolean = true): IDevForJoin => {

    const password = faker.internet.password().substring(1, 10);
    return {
        email: isValid
                ? faker.internet.email().substring(1, 10)
                : faker.internet.email().substring(1, 1),
        name: faker.internet.userName().substring(1,10),
        password, passwordConfirm: password
    };
    
};

export const createIDevForLogin = (isValid: boolean = true): IDevForLogin => {

    return {
        email: isValid
                ? faker.internet.email().substring(1, 10)
                : faker.internet.email().substring(1, 1),
        password: faker.internet.password().substring(1, 10)
    };

};

export const createIDevForToken = (isValid: boolean = true, id?: number): IDevForToken => {

    return {
        id: id ?? faker.random.number(),
        email: isValid
                ? faker.internet.email().substring(1, 10)
                : faker.internet.email().substring(1, 1),
        password: faker.internet.password(),
    };

};