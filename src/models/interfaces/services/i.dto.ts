import * as Joi from 'joi';

export interface IDto {

    getJoiObject<T>(): Joi.ObjectSchema<T>;

}