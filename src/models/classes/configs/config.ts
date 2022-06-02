// dtos
import { Algorithm } from 'jsonwebtoken';
import { IConfig, ILogConfig, IPoolConfig, ITokenConfig } from '../../interface.loader';

import * as ConfigPrivate from './config.private';
import * as ObjectIterator from '../iterator';


export class Config implements IConfig {

    PORT: number;
    LOG_CONF: ILogConfig;
    POOL_CONF: IPoolConfig;
    TOKEN_CONF: ITokenConfig;

    [Symbol.iterator]: any;

    constructor() {
        
        this.PORT = this.getNumberEnv('PORT');
        this.LOG_CONF = {
            DIR: this.getStringEnv('LOG_DIR'),
            [Symbol.iterator]: ObjectIterator.generator
        };
        this.POOL_CONF = {
            HOST: this.getStringEnv('PG_POOL_HOST'),
            USER: this.getStringEnv('PG_POOL_USER'),
            DATABASE: this.getStringEnv('PG_POOL_DATABASE'),
            PASSWORD: this.getStringEnv('PG_POOL_PASSWORD'),
            PORT: this.getNumberEnv('PG_POOL_PORT'),
            [Symbol.iterator]: ObjectIterator.generator
        }

        this.TOKEN_CONF = {
            SECRET: this.getStringEnv('JWT_SECRET'),
            ALGORITHM: this.getAlgorihtmEnv('JWT_ALGORITHM'),
            ACCESS_EXPIRED: this.getStringEnv('JWT_ACCESS_EXPIRED'),
            REFRESH_EXPIRED: this.getStringEnv('JWT_REFRESH_EXPIRED'),
            [Symbol.iterator]: ObjectIterator.generator
        }
        this[Symbol.iterator] = ObjectIterator.generator;

        this.isValid(this);
        
    }

    private getStringEnv = ConfigPrivate.getStringEnv;

    private getNumberEnv = ConfigPrivate.getNumberEnv;

    private getAlgorihtmEnv = ConfigPrivate.getAlgorihtmEnv;

    private isValid = ConfigPrivate.isValid;

}