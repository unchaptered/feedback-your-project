import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';

// DI Constants
import { FACTORIES, REPOSITORIES, SERVICES, VALIDATORS } from '../../constants/constant.loader';

// Classes (Layer & Modules)
import { BaseLayer } from '../base/base.layer';
import { SiteRepository } from '../layer.loader';
import { TokenFactory } from '../../modules/module.loader';

// Dtos (Classes)
import { QueryResult } from 'pg';
import { SiteForPost, SiteForPut, SiteUrl } from '../../models/class.loader';


@provide(SERVICES.SiteService)
export class SiteService extends BaseLayer {

    constructor(
        // Layer
        @inject(REPOSITORIES.SiteRepository) private siteRepository: SiteRepository,
        // Modules
        @inject(FACTORIES.TokenFactory) private  tokenFactory: TokenFactory
    ) {
        super();
    }

    public async postSite(iSite: SiteForPost): Promise<QueryResult> {

        try {

            // console.log(this.tokenFactory.decodeToken(token.substr(7)));

            return await this.siteRepository.postSite(iSite);

        } catch(err) {

            throw this.errorHandler(err);

        }

    }

    public async putSite(siteUrl: SiteUrl, siteForPut: SiteForPut) {

        try {

            return await this.siteRepository.putSite(siteUrl, siteForPut);
            
        } catch(err) {

            throw this.errorHandler(err);
        }

    }

    public disableSite(iSite: SiteUrl) {
        this.siteRepository.disableSite(iSite);
    }

}