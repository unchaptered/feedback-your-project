import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { createRequest, createResponse } from 'node-mocks-http';

import { IDevForJoinFilter, IDevForLoginFilter, IDevForTokenFilter } from '../../../../src/middlewares/middleware.loader';
import { JoiIDevForJoin, JoiIDevForLogin, JoiIDevForToken, JoiProvider, LoggerProvider, ResponseProvider } from '../../../../src/modules/module.loader';

describe ('Filter', () => {

    let req: Request;
    let res: Response;
    let next: NextFunction;

    let joiProvider: JoiProvider;
    let logProvider: LoggerProvider;
    let resProvider: ResponseProvider;

    let joiIDevForLogin: JoiIDevForLogin;
    let joiIDevForJoin: JoiIDevForJoin;
    let joiIDevForToken: JoiIDevForToken;

    let iDevForJoinFilter: IDevForJoinFilter;
    let iDevForLoginFilter: IDevForLoginFilter;
    let iDevForTokenFilter: IDevForTokenFilter;

    beforeEach(() => {
        req = createRequest();
        res = createResponse();
        next = jest.fn();

        joiIDevForLogin = new JoiIDevForLogin();
        joiIDevForJoin = new JoiIDevForJoin();
        joiIDevForToken = new JoiIDevForToken();
        
        joiProvider = new JoiProvider(joiIDevForLogin, joiIDevForJoin, joiIDevForToken);

        joiProvider.validateIDevForJoin = jest.fn();
        joiProvider.validateIDevForLogin = jest.fn();
        joiProvider.validateIDevForToken = jest.fn();

        logProvider = new LoggerProvider();
        logProvider.writeError = jest.fn();
        logProvider.writeInfo = jest.fn();
        
        resProvider = new ResponseProvider();

        LoggerProvider.initialize('samples');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe ('IDev For Join Filter', () => {

        beforeEach(() => {

            iDevForJoinFilter = new IDevForJoinFilter(joiProvider, logProvider, resProvider);

        });

        it ('should call validateUserDetail', async () => {

            await iDevForJoinFilter.handler(req, res, next);

            expect(joiProvider.validateIDevForJoin).toBeCalledTimes(1);
            expect(joiProvider.validateIDevForJoin).toBeCalledWith(req?.body);

        });

    });
    
    describe ('IDev For Login Filter', () => {

        beforeEach(() => {

            iDevForLoginFilter = new IDevForLoginFilter(joiProvider, logProvider, resProvider);

        });

        it ('should call validateUser', async () => {

            await iDevForLoginFilter.handler(req, res, next);

            expect(joiProvider.validateIDevForLogin).toBeCalledTimes(1);
            expect(joiProvider.validateIDevForLogin).toBeCalledWith(req?.body);

        });

    });

    describe ('IDev For Token Filter', () => {

        beforeEach(() => {

            iDevForTokenFilter = new IDevForTokenFilter(joiProvider, logProvider, resProvider);

        });

        it ('should call validateUser', async () => {

            await iDevForTokenFilter.handler(req, res, next);

            expect(joiProvider.validateIDevForToken).toBeCalledTimes(1);
            expect(joiProvider.validateIDevForToken).toBeCalledWith(req?.body);

        });

    });


    
});