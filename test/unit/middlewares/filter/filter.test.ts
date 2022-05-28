import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { createRequest, createResponse } from 'node-mocks-http';

import { JoinFilter, LoginFilter } from '../../../../src/middlewares/middleware.loader';
import { JoiProvider, LoggerProvider, ResponseProvider } from '../../../../src/modules/module.loader';

describe ('Filter', () => {

    let req: Request;
    let res: Response;
    let next: NextFunction;

    let joiProvider: JoiProvider;
    let logProvider: LoggerProvider;
    let resProvider: ResponseProvider;

    let loginFilter: LoginFilter;
    let joinFilter: JoinFilter;

    beforeEach(() => {
        req = createRequest();
        res = createResponse();
        next = jest.fn();

        joiProvider = new JoiProvider();
        joiProvider.validateUser = jest.fn();
        joiProvider.validateUserDetail = jest.fn();

        logProvider = new LoggerProvider();
        logProvider.writeError = jest.fn();
        logProvider.writeInfo = jest.fn();
        
        resProvider = new ResponseProvider();

        LoggerProvider.initialize('samples');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe ('Login Filter', () => {

        beforeEach(() => {

            loginFilter = new LoginFilter(joiProvider, logProvider, resProvider);

        });

        it ('should call validateUser', async () => {

            await loginFilter.handler(req, res, next);

            expect(joiProvider.validateUser).toBeCalledTimes(1);
            expect(joiProvider.validateUser).toBeCalledWith(req?.body);

        });

    });

    describe ('Join Filter', () => {

        beforeEach(() => {

            joinFilter = new JoinFilter(joiProvider, logProvider, resProvider);

        });

        it ('should call validateUserDetail', async () => {

            await joinFilter.handler(req, res, next);

            expect(joiProvider.validateUserDetail).toBeCalledTimes(1);
            expect(joiProvider.validateUserDetail).toBeCalledWith(req?.body);

        });

    });
    
});