import { JwtPayload } from 'jsonwebtoken';

/**
 * Blueprint of DevQueryBuilder
 * 
 * Must Realize `4 public functions`
 */
export interface ITokenFactory {

    getAccessToken(): string;
    getRefreshToken(data: object): string;
    verifyToken(token: string): JwtPayload | Error;
    decodeToken(token: string): JwtPayload | null | Error;

}