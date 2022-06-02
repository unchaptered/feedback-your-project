import 'reflect-metadata';
import * as Joi from 'joi';

import { provide } from 'inversify-binding-decorators';


// di
import { JOYS } from '../../../constants/constant.loader';

// Dtos
import { IDevForJoin, IDevForLogin, IDevForToken, IJoiBuilder } from '../../interface.loader';


@provide(JOYS.iDevForLogin)
export class JoiIDevForLogin implements IJoiBuilder<IDevForJoin> {

    constructor() {}

    public getInstance(): Joi.ObjectSchema<IDevForJoin> {
        return Joi.object({
            email: Joi.string().min(3).max(50).required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        });
    }

}

@provide(JOYS.iDevForJoin)
export class JoiIDevForJoin implements IJoiBuilder<IDevForLogin> {

    constructor() {}

    public getInstance(): Joi.ObjectSchema<IDevForLogin> {
        return Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().min(3).max(30).required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            passwordConfirm: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
        });
    }

}

@provide(JOYS.iDevForToken)
export class JoiIDevForToken implements IJoiBuilder<IDevForToken> {

    constructor() {}

    public getInstance(): Joi.ObjectSchema<IDevForToken> {
        return Joi.object({
            id: Joi.number().min(0).required(),
            email: Joi.string().min(3).max(30).required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
        });
    }

}