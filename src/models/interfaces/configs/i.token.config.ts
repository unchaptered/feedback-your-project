import { Secret, Algorithm } from "jsonwebtoken";


export interface ITokenConfig {
    SECRET: Secret;
    ALGORITHM: Algorithm;

    ACCESS_EXPIRED: string;
    REFRESH_EXPIRED: string;
    [Symbol.iterator]: any;
};