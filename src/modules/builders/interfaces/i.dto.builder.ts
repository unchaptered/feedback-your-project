import { Dev, DevForJoin, DevForLogin, DevForToken } from '../../../models/class.loader';
import { IDev, IDevForJoin, IDevForLogin, IDevForToken } from '../../../models/interface.loader';


/**
 * Blueprint of DtoBuilder
 * 
 * Must Realize `4 public functions`
 */
export interface IDtoBuilder {
    
    getDev(d: IDev): Promise<Dev>;
    getDevForJoin(d: IDevForJoin): Promise<DevForJoin>;
    getDevForToken(d: IDevForToken): Promise<DevForToken>;
    getDevForLogin(d: IDevForLogin): Promise<DevForLogin>;


}