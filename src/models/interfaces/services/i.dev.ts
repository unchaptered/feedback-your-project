import * as Joi from 'joi';


export interface IDev {

    id?: number;
    name: string;
    email: string;
    password: string;
    
}

export interface IDevForToken {

    id: number;
    email: string;
    password: string;

}

export interface IDevForLogin {

    email: string;
    password: string;

}

export interface IDevForJoin {

    name: string;
    email: string;
    password: string;
    passwordConfirm: string;

}