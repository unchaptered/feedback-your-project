import * as Joi from 'joi';

// Dtos (Interfaces)
import { IDto, IDev, IDevForJoin, IDevForLogin, IDevForToken } from 'models/interface.loader';


export class Dev implements IDev, IDto {

    id?: number | undefined;
    email: string;
    name: string;
    password: string;

    constructor(iDev: IDev) {

        this.id = iDev?.id;
        this.name = iDev?.name;
        this.email = iDev.email;
        this.password = iDev.password;

    }

    getJoiObject<Dev>(): Joi.ObjectSchema<Dev> {

        return Joi.object({
            id: Joi.number().min(0),
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().min(3).max(50).required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
        })

    }

}

export class DevForJoin implements IDevForJoin, IDto {

    email: string;
    name: string;
    password: string;
    passwordConfirm: string;

    constructor(iDev: IDevForJoin) {
        this.email = iDev.email;
        this.name = iDev.name;
        this.password = iDev.password;
        this.passwordConfirm = iDev.passwordConfirm;

    }

    getJoiObject<DevForJoin>(): Joi.ObjectSchema<DevForJoin> {

        return Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().min(3).max(50).required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            passwordConfirm:  Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
        });

    }
    
}

export class DevForLogin implements IDevForLogin, IDto {

    email: string;
    password: string;

    constructor(iDev: IDevForLogin) {
        this.email = iDev.email;
        this.password = iDev.password;
    }

    getJoiObject<DevForLogin>(): Joi.ObjectSchema<DevForLogin> {
        
        return Joi.object({
            email: Joi.string().min(3).max(50).required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        });

    }
    
    
}

export class DevForToken implements IDevForToken, IDto {

    id: number;
    email: string;
    password: string;

    constructor(iDev: IDevForToken) {

        this.id = iDev.id;
        this.email = iDev.email;
        this.password = iDev.password;

    }

    getJoiObject<DevForToken>(): Joi.ObjectSchema<DevForToken> {
        
        return Joi.object({
            id: Joi.number().min(0).required(),
            email: Joi.string().min(3).max(50).required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        });

    }

}