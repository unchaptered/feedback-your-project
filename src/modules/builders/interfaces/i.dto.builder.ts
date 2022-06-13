import {
    Dev, DevForJoin, DevForLogin, DevForToken,
    Site, SiteForPost, SiteForPut, SiteUrl } from '../../../models/class.loader';
import {
    IDev, IDevForJoin, IDevForLogin, IDevForToken,
    ISite, ISiteForPost, ISiteForPut, ISiteUrl } from '../../../models/interface.loader';


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

    getSite(s: ISite): Promise<Site>;
    getSiteUrl(data: ISiteUrl): Promise<SiteUrl>;
    getSiteForPost(s: ISiteForPost): Promise<SiteForPost>;
    getSiteForPut(data: ISiteForPut): Promise<SiteForPut>;
    
}