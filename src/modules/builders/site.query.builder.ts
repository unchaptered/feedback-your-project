import { provide } from 'inversify-binding-decorators';

// DI Constants
import { BUILDERS } from '../../constants/constant.loader';
import { ISiteQueryBuilder } from './interfaces/i.site.query.builder';

// Dtos
import { SiteUrl, SiteForPost, SiteForPut, Site } from '../../models/class.loader';


@provide(BUILDERS.SiteQueryBuilder)
export class SiteQueryBuilder implements ISiteQueryBuilder {

    // Find

    public isExistsSiteByUrl(url: string): string {
        return `SELECT id FROM site WHERE url='${url}';`;
    }
    public isExistsSiteDescriptionBySiteId(id: number): string {
        return `SELECT id FROM site_description WHERE site_id=${id};`;
    }

    // Select

    public getSiteByUrl(url: string): string {
        return `SELECT id, url, name FROM site WHERE url = '${url}';`;
    }

    // Insert

    public postSite(iSite: SiteForPost): string {

        return `INSERT INTO site (url, name) VALUES ('${iSite.url}', '${iSite.name}');`;

    }

    public postSiteDescription(siteId: number, siteDescription: string): string {

        return `INSERT INTO site_description (site_id, description) VALUES (${siteId}, '${siteDescription}');`;

    }

    public postDisabledSite(site: Site): string {
        return `INSERT INTO site_disabled (url, name) VALUES ('${site.url}', '${site.name}');`;
    }
    public postDisabledSiteDescription(siteId: number, description: string): string {
        return `INSERT INTO site_description_disalbed (site_id, description) VALUES (${siteId}, '${description}');`;
    }

    // Update

    public putSiteUrlOrName(siteId: number, site: SiteForPut): string {
        
        let tmp = `UPDATE site SET `;

        if (site.url)
            if (site.name) tmp += `url = '${site.url}' AND name = '${site.name}' WHERE id = ${siteId};`;
            else tmp += `url = '${site.url}' WHERE id = ${siteId};`;
        else tmp += `name = '${site.name}' WHERE id = ${siteId};`;

        return tmp;

    }

    public putSiteDescription(siteId: number, siteDescription: string): string {
        return `UPDATE site_description SET description = '${siteDescription}' WHERE site_id = ${siteId};`;
    }

    // Delete

    public deleteSite(url: string) {
        return `DELETE site WHERE url = '${url}';`;
    }

    public deleteSiteDescription(siteId: number) {
        return `DELETE site_description WHERE site_id = ${siteId};`;
    }
    
}
