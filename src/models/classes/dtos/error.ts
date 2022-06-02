import { ICustomException } from '../../interface.loader';

/**
 * 404 NotFound
 */
export class NotFoundException implements ICustomException {

    message: string;
    name: string;

    statusCode: number;

    constructor(message: string) {

        this.message = message;
        this.name = 'NotFoundException';

        this.statusCode = 404;

    }

};


/**
 * 409 Conflict
 */
export class ConflictException implements ICustomException {

    message: string;
    name: string;

    statusCode: number;

    constructor(message: string) {

        this.message = message;
        this.name = 'ConflictException';

        this.statusCode = 409;
    }
}

/**
 * 400 BadRequest
 */
export class BadRequestException implements ICustomException {

    message: string;
    name: string;

    statusCode: number;

    constructor(message: string) {

        this.message = message;
        this.name = 'BadRequestException';

        this.statusCode = 400;
    }

};