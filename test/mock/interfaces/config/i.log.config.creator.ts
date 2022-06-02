import * as faker from 'faker';

// Mock Target
import { ILogConfig } from '../../../../src/models/interface.loader';


export const createILogConf = (): ILogConfig => {

    return {
        DIR: faker.random.word(),
        [Symbol.iterator]: function* () {
            const values = Object.values(this);

            for (const val of values)
                yield val;
        }
    };

}