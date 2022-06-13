import { SiteUrl, SiteForPost, SiteForPut, Site } from '../../../models/class.loader';


export interface ISiteQueryBuilder {

    isExistsSiteByUrl(url: string): string;
    isExistsSiteDescriptionBySiteId(id: number): string;

    postSite(iSite: SiteForPost): string;
    postSiteDescription(siteId: number, siteDescription: string): string;

    postDisabledSite(site: Site): string;
    postDisabledSiteDescription(siteId: number, description: string): string;

    putSiteUrlOrName(siteId: number,site: SiteForPut): string;
    putSiteDescription(siteId: number, description: string): string;

}