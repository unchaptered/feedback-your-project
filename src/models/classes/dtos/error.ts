import { ICustomException } from '../../interface.loader';

export class CustomException implements ICustomException {

    name: string;
    message: string;
    statusCode: number;


    constructor(name: string, message: string, statusCode: number) {
        this.name = name;
        this.message = message;
        this.statusCode = statusCode;
    }

};

/**
 * 400 BadRequest
 */
 export class BadRequestException extends CustomException {

    constructor(message: string) {

        super('BadRequestException', message, 400);

    }

};

/**
 * 401 Unauthorized
 */
export class UnauthorizedException extends CustomException {

    constructor(message: string) {
        super('UnauthorizedException', message, 401);
    }
};

/**
 * 404 NotFound
 */
export class NotFoundException extends CustomException {

    constructor(message: string) {
        super('NotFoundException', message, 404);
    }

};


/**
 * 409 Conflict
 */
export class ConflictException extends CustomException {

    constructor(message: string) {

        super('ConflictException', message, 409);

    }
};

export class IntervalServerError extends CustomException {


    constructor(message: string) {

        super('IntervalServerError', message, 500);

    }

};

export class UnkownServerError extends CustomException {

    constructor(message: string) {

        super('UnkownServerError', message, 500);

    }

};