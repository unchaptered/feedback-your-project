import * as faker from 'faker';

// Mock Target
import { IConfig } from '../../../src/models/interface.loader';
import { craeteIPoolConfig } from './i.pool.config.creator';


export const craeteIConfig = (): IConfig => {

    return {
        PORT: faker.internet.port(),
        PG_POOL: craeteIPoolConfig(),
        [Symbol.iterator]: function* () {
            const values = Object.values(this);

            for (const val of values)
                yield val;
        }
    };

};