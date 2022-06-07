import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';

// Di Constant
import { BUILDERS, VALIDATORS } from '../../constants/constant.loader';
import { IDtoBuilder } from './interfaces/i.dto.builder';
import { BaseModule } from '../base/base.modules';

// Dtos (classes & interfaces)
import { Dev, DevForJoin, DevForLogin, DevForToken } from '../../models/class.loader';
import { IDev, IDevForJoin, IDevForLogin, IDevForToken } from '../../models/interface.loader';

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
            
            const dev = new Dev(data);

            const devJoi = dev.getJoiObject<Dev>();
            await this.joi.validate(data, devJoi);

            return dev;

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

            const dev = new DevForJoin(data);

            const devJoi = dev.getJoiObject<DevForJoin>();
            await this.joi.validate(data, devJoi);
            
            return dev;

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

            const dev = new DevForToken(data);

            const devJoi = dev.getJoiObject<DevForToken>();
            await this.joi.validate(data, devJoi);

            return dev;

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

            
            const dev = new DevForLogin(data);

            const devJoi = dev.getJoiObject<DevForLogin>();
            await this.joi.validate(data, devJoi);

            return dev;

        } catch(err) {
            
            throw this.errorHandler(err);

        }

    }

};