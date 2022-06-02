import * as faker from 'faker';

// Mock Target
import { ITokenConfig } from '../../../../src/models/interface.loader';


export const createITokenConf = (): ITokenConfig => {

    return {
        SECRET: 'testsdamfladmsk12',
        ALGORITHM: 'HS256',
        ACCESS_EXPIRED: '30s',
        REFRESH_EXPIRED: '60s',
        [Symbol.iterator]: function* () {
            const values = Object.values(this);

            for (const val of values)
                yield val;
        }
    };
    
}