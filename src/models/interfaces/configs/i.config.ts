// interafce
import { ILogConfig } from './i.log.config';
import { IPoolConfig } from './i.pool.config';
import { ITokenConfig } from './i.token.config';


export interface IConfig {
    PORT: number;
    LOG_CONF: ILogConfig;
    POOL_CONF: IPoolConfig;
    TOKEN_CONF: ITokenConfig;
    [Symbol.iterator]: any;
};