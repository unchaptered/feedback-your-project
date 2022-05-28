import * as Joi from "joi";
import { provide } from 'inversify-binding-decorators';

// di1
import { MODULES } from '../../constants/modules.symbol';

// dtos
import { IUser, IUserDetail } from '../../models/interface.loader';

// private
import * as JoiPrivate from './private/joi.private';

export interface IJoiProvider {

    UserDetailJoi: Joi.ObjectSchema<any>;
    UserJoi: Joi.ObjectSchema<any>;

}

@provide(MODULES.JoiProvider)
export class JoiProvider implements IJoiProvider {

    UserDetailJoi: Joi.ObjectSchema<any>;
    UserJoi: Joi.ObjectSchema<any>;

    constructor() {
        this.UserDetailJoi = Joi.object({
            id: Joi.number().min(0),
            email: Joi.string().min(3).max(30).required(),
            username: Joi.string().min(3).max(30).required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            passwordConfirm: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
        });
        this.UserJoi = Joi.object({
            id: Joi.number().min(0),
            email: Joi.string().min(3).max(30).required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        });
    }

    private errHandler = JoiPrivate.errHandler;

    public async validateUserDetail(user: IUserDetail): Promise<IUserDetail | Error> {
        try {
            return await this.UserDetailJoi.validateAsync({ ...user });
        } catch (err) {
            return this.errHandler(err);
        } 
    }

    public async validateUser(user: IUser): Promise<IUser | Error> {
        try {
            return await this.UserJoi.validateAsync({ ...user });
        } catch (err) {
            return this.errHandler(err);
        } 
    }

}