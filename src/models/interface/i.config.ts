// interafce
import { IPoolConfig } from "./i.pool.config";


export interface IConfig {
    PORT: number | undefined;
    PG_POOL: IPoolConfig | undefined;
    [Symbol.iterator]: any;
};