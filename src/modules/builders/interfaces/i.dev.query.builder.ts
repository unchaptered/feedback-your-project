import { IDevForJoin, IDevForLogin } from '../../../models/interface.loader';


/**
 * Blueprint of DevQueryBuilder
 * 
 * Must Realize `8 public functions`
 */
export interface IDevQueryBuilder {

    isExistsByName(n: string): string;
    isExistsByEamil(e: string): string;
    isExists(n: string, e: string): string;

    join(V: IDevForJoin): string;
    login(V: IDevForLogin): string;

    deleteRefreshToken(id: number): string;
    saveRefreshToken(id: number, token: string): string;

}