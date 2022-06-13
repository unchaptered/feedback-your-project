import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';

// Di Constant
import { BUILDERS, VALIDATORS } from '../../constants/constant.loader';
import { IDtoBuilder } from './interfaces/i.dto.builder';
import { BaseModule } from '../base/base.modules';

// Dtos (classes & interfaces)
import { Dev, DevForJoin, DevForLogin, DevForToken, Site, SiteForPost, SiteForPut, SiteUrl } from '../../models/class.loader';
import {
    IDev, IDevForJoin, IDevForLogin, IDevForToken,
    ISite, ISiteForPost, ISiteForPut, ISiteUrl } from '../../models/interface.loader';

// Providers
import { JoiValidator } from '../module.loader';

/**
 * @extends `BaseModule`
 * @implements `IDtoBuilder`
 */
@provide(BUILDERS.DtoBuilder)
export class DtoBuilder extends BaseModule implements IDtoBuilder {

    constructor(
        
        @inject(VALIDATORS.JoiValidator) private joi: JoiValidator

    ) {
        super();
    }

    /**
     * @throws 'CustomException'
     * @param data: IDev
     * @returns Promise<Dev>
     */
    public async getDev(data: IDev): Promise<Dev> {

        try {
            
            return new Dev(
                await this.joi.validate(data, Dev.joiObject));


        } catch (err) {

            throw this.errorHandler(err);

        }

    }

    /**
     * @throws 'CustomException'
     * @param data: IDevForJoin
     * @returns Promise<DevForJoin>
     */
    public async getDevForJoin(data: IDevForJoin): Promise<DevForJoin> {

        try {
            
            return new DevForJoin(
                await this.joi.validate(data, DevForJoin.joiObject));

        } catch(err) {
            
            throw this.errorHandler(err);

        }
    }


    /**
     * @throws 'CustomException'
     * @param data: IDevForToken
     * @returns Promise<DevForToken>
     */
    public async getDevForToken(data: IDevForToken): Promise<DevForToken> {

        try {

            return new DevForToken(
                await this.joi.validate(data, DevForToken.joiObject));

        } catch(err) {
            
            throw this.errorHandler(err);

        }
    }

    /**
     * @throws 'CustomException'
     * @param data: IDevForLogin
     * @returns Promise<DevForLogin>
     */
    public async getDevForLogin(data: IDevForLogin): Promise<DevForLogin> {

        try {

            return new DevForLogin(
                await this.joi.validate(data, DevForLogin.joiObject));

        } catch(err) {
            
            throw this.errorHandler(err);

        }

    }

    public async getSite(data: ISite): Promise<Site> {

        try {
            return new Site(
                await this.joi.validate(data, Site.joiObject));
        } catch(err) {
            throw this.errorHandler(err);
        }

    }

  
    public async getSiteForPost(data: ISiteForPost): Promise<SiteForPost> {

        try {
            return new SiteForPost(
                await this.joi.validate(data, SiteForPost.joiObject));
        } catch(err) {
            throw this.errorHandler(err);
        }

    };
    public async getSiteForPut(data: ISiteForPut): Promise<SiteForPut> {

        try {
            return new SiteForPut(
                await this.joi.validate(data, SiteForPut.joiObject));
        } catch(err) {
            throw this.errorHandler(err);
        }

    };

    public async getSiteUrl(data: ISiteUrl): Promise<SiteUrl> {

        try {
            return new SiteUrl(
                await this.joi.validate(data, SiteUrl.joiObject));
        } catch(err) {
            throw this.errorHandler(err);
        }

    };  


};