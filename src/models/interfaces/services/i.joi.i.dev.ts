import * as Joi from 'joi';


export interface IJoiBuilder<T> {

    getInstance: () => Joi.ObjectSchema<T>;

}