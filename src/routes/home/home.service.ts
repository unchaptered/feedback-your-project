import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';

// DI Constatns
import { SERVICES, REPOSITORIES } from '../../constants/constant.loader';

// Classes (Layer & Modules)
import { BaseLayer } from '../base/base.layer';
import { HomeRepository } from './home.repository';

// Dtos (Classes & Interfaces)
import { QueryResult } from 'pg';
import { DevForJoin, DevForLogin } from '../../models/class.loader';


@provide(SERVICES.HomeService)
export class HomeService extends BaseLayer {

    constructor(
        @inject(REPOSITORIES.HomeRepository) private homeRepository: HomeRepository
    ) {
        super();
    }

    public async join(iDev: DevForJoin): Promise<QueryResult> {

         try {

            return await this.homeRepository.join(iDev);

         } catch(err) {

            throw this.errorHandler(err);

         }
        
    }

    public async login(iDev: DevForLogin): Promise<QueryResult> {


        try {
            
            return await this.homeRepository.login(iDev);

        } catch (err) {

            throw this.errorHandler(err);
            
        }
        
    }

}