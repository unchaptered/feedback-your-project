import * as faker from 'faker';

// Mock Target
import { IConfig } from '../../../../src/models/interface.loader';
import { createILogConf } from './i.log.config.creator';
import { craeteIPoolConfig } from './i.pool.config.creator';
import { createITokenConf } from './i.token.config.creater';


export const craeteIConfig = (): IConfig => {

    return {
        PORT: faker.internet.port(),
        LOG_CONF: createILogConf(),
        POOL_CONF: craeteIPoolConfig(),
        TOKEN_CONF: createITokenConf(),
        [Symbol.iterator]: function* () {
            const values = Object.values(this);

            for (const val of values)
                yield val;
        }
    };

};