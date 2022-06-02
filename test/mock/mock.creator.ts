// classes
import * as form from './classes/form.creator';

// facotries
import * as pool from './factories/pool.creator';

// fake token
import * as token from './token/fake.token.creator';

// interafaces of Config
import * as iConfig from './interfaces/config/i.config.creator';
import * as iLogConfig from './interfaces/config/i.log.config.creator';
import * as iPoolConfig from './interfaces/config/i.pool.config.creator';
import * as iTokenConfig from './interfaces/config/i.token.config.creater';

// interfaces of Service
import * as iDev from './interfaces/service/i.dev.creaetor';
import * as iSite from './interfaces/service/i.site.creator';

// interfaces of Return Type
import * as iForm from './interfaces/dtos/i.form.creator';
import * as iCustomException from './interfaces/dtos/i.error.creator';

export default {
    form,
    pool,
    token,

    Config: {
        iConfig,
        iLogConfig,
        iPoolConfig,
        iTokenConfig,
    },

    Service: {
        iDev,
        iSite,
    },

    iForm,
    iCustomException
    
};