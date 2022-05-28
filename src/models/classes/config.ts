// dtos
import { IConfig, IPoolConfig } from '../interface.loader';


export class Config implements IConfig {

    PORT: number | undefined;
    PG_POOL: IPoolConfig | undefined;
    [Symbol.iterator]: any;

    constructor() {
        this.PORT = process.env.PORT ? +process.env.PORT : undefined,
        this.PG_POOL = {
            HOST: process.env.PG_POOL_HOST,
            USER: process.env.PG_POOL_USER,
            DATABASE: process.env.PG_POOL_DATABASE,
            PASSWORD: process.env.PG_POOL_PASSWORD,
            PORT: process.env.PG_POOL_PORT ? +process.env.PG_POOL_PORT : undefined,
            [Symbol.iterator]: this.iterator
        };
        this[Symbol.iterator] = this.iterator;

    }
    private* iterator() {
        const values = Object.values(this);

        for (const val of values)
            yield val;
    }

}
