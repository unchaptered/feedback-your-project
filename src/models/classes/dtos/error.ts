import { ICustomException } from '../../interface.loader';

/**
 * 404 NotFound
 */
export class NotFoundException implements ICustomException {

    message: string;
    name: string;

    constructor(m: string) {

        this.message = m;
        this.name = '404';
    }

};


/**
 * 409 Conflict
 */
export class ConflictException implements ICustomException {

    message: string;
    name: string;

    constructor(m: string) {

        this.message = m;
        this.name = '404';
    }
}

/**
 * 400 BadRequest
 */
export class BadRequestException implements ICustomException {

    message: string;
    name: string;

    constructor(m: string) {

        this.message = m;
        this.name = '404';
    }

};