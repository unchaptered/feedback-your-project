import * as Joi from 'joi';
import { provide } from 'inversify-binding-decorators';

// Di Constant
import { VALIDATORS } from '../../constants/constant.loader';

// Base Module
import { BaseModule, BaseValidator } from '../base/base.modules';
import { IDev, IDevForJoin, IDevForLogin, IDevForToken } from '../../models/interface.loader';
import { BadRequestException, CustomException, UnkownServerError } from 'models/class.loader';


@provide(VALIDATORS.JoiValidator)
export class JoiValidator extends BaseValidator {

    constructor() {
        super();
    }
    
    /**
     * @throws `CustomException`
     * @param data : T
     * @param joi : Joi.ObejectSchmea<T>
     * @returns : Promise<T>
     */
    public async validate<T extends IDev | IDevForJoin | IDevForLogin | IDevForToken>(
        data: T,
        joi: Joi.ObjectSchema<T>
    ): Promise<T> {

        try {

            return await joi.validateAsync({ ...data });

        } catch(err) {

            throw this.errorHandler(err);

        }
    }
    
}
