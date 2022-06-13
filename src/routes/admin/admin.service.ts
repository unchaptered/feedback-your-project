import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';

// DI Constants
import { REPOSITORIES, SERVICES } from '../../constants/constant.loader';

// Classes (Layer & Modules)
import { BaseLayer } from '../base/base.layer';
import { AdminRepository } from '../repository.loader';

// Dtos (Classes)
import { QueryResult } from 'pg';
import { SiteForPost, SiteForPut, SiteUrl } from '../../models/class.loader';


@provide(SERVICES.AdminService)
export class AdminService extends BaseLayer {

    constructor(
        // Layer
        @inject(REPOSITORIES.AdminRepository) private adminRepository: AdminRepository
    ) {
        super();
    }

    public async postSite(iSite: SiteForPost): Promise<QueryResult> {

        try {

            return await this.adminRepository.postSite(iSite);

        } catch(err) {

            throw this.errorHandler(err);

        }

    }

    public async putSite(siteUrl: SiteUrl, siteForPut: SiteForPut) {

        try {

            return await this.adminRepository.putSite(siteUrl, siteForPut);
            
        } catch(err) {

            throw this.errorHandler(err);
        }

    }

    public disableSite(iSite: SiteUrl) {
        this.adminRepository.disableSite(iSite);
    }

}