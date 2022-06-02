import * as faker from 'faker';

// Mock Target
import { IPoolConfig } from '../../../../src/models/interface.loader';


export const craeteIPoolConfig = (): IPoolConfig => {

    return {
        HOST: 'localhost',
        USER: 'postgres',
        DATABASE: faker.internet.userAgent(),
        PASSWORD: faker.internet.password(),
        PORT: +faker.commerce.price(),
        [Symbol.iterator]: function* () {
            const values = Object.values(this);

            for (const val of values)
                yield val;
        }
    };

};