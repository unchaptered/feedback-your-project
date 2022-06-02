import 'reflect-metadata';
import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { BaseMiddleware } from 'inversify-express-utils';
import { createRequest, createResponse } from 'node-mocks-http';

import { AccessTokenGuard, RefreshTokenGuard } from '../../../../src/middlewares/middleware.loader';
import { TokenFactory, LoggerProvider, ResponseProvider } from '../../../../src/modules/module.loader';
import mockCreator from '../../../mock/mock.creator';


describe ('Token Guard', () => {

    let req: Request;
    let res: Response;
    let next: NextFunction;

    let logProvider: LoggerProvider;
    let resProvider: ResponseProvider;
    let tokenFactory: TokenFactory;

    let accessTokenGuard: AccessTokenGuard;
    let refreshTokenGuard: RefreshTokenGuard;

    // Initialize before using
    beforeAll(() => {
        LoggerProvider.initialize('samples');
        TokenFactory.initialize(
            mockCreator.Config.iTokenConfig.createITokenConf()
        );
    });
    // Mocking
    beforeEach(() => {
        req = createRequest();
        res = createResponse();
        next = jest.fn();

        logProvider = new LoggerProvider();
        logProvider.writeError = jest.fn();
        logProvider.writeInfo = jest.fn();
        
        resProvider = new ResponseProvider();
        resProvider.getFailureForm = jest.fn();
        resProvider.getSuccessForm = jest.fn();

        tokenFactory = new TokenFactory();
        tokenFactory.verifyToken = jest.fn((token: string) => {
            const { tokenConfig } = TokenFactory;

            try {
                return jwt.verify(token, tokenConfig.SECRET, { complete: true });
            } catch(err) {
                return new Error('Teste Error : ');
            }
        });
    });

    beforeEach(() => jest.useFakeTimers());
    afterEach(() => {
        jest.runAllTimers()
        jest.clearAllMocks();
    });


    it ('AccessTokenGuards extends BaseMiddleware', () =>
        expect(
            new AccessTokenGuard(logProvider, resProvider, tokenFactory)
            instanceof BaseMiddleware).toBeTruthy());
    it ('RefreshTokenGaurds extends BaseMiddleware', () =>
        expect(
            new RefreshTokenGuard(logProvider, resProvider, tokenFactory)
            instanceof BaseMiddleware).toBeTruthy());
    

    describe ('logics', () => {

        describe ('AccessTokenGuards', () => {

            beforeEach(() => {
                accessTokenGuard = new AccessTokenGuard(logProvider, resProvider, tokenFactory);
            });

            it ('IF no-token, server should return 400', () => {

                accessTokenGuard.handler(req, res, next);
                expect(res.statusCode).toBe(400);

                const message = '엑세스 토큰이 누락되었습니다.';
                expect(logProvider.writeError).toBeCalled();
                expect(logProvider.writeError).toBeCalledWith(message);
                expect(resProvider.getFailureForm).toBeCalled();
                expect(resProvider.getFailureForm).toBeCalledWith(message);

                expect(tokenFactory.verifyToken).not.toBeCalled();
                expect(next).not.toBeCalled();

            });

            it ('IF bad-token, server should return 403', () => {

                const wrongSecret = 'secret_keys';
                const wrongToken = jwt.sign({}, wrongSecret);

                req.headers.authorization = 'Bearer ' + wrongToken;
                accessTokenGuard.handler(req, res, next);
                expect(res.statusCode).toBe(403);

                const message = new Error('Teste Error : ').message;
                expect(logProvider.writeError).toBeCalled();
                expect(logProvider.writeError).toBeCalledWith(message);
                expect(resProvider.getFailureForm).toBeCalled();
                expect(resProvider.getFailureForm).toBeCalledWith(message);

                expect(tokenFactory.verifyToken).toBeCalled();
                expect(tokenFactory.verifyToken).toBeCalledWith(wrongToken);
                expect(next).not.toBeCalled();

            });

            it ('If good-token, server call next', () => {

                const sampleData = { username: 'unchaptered' };
                const accessToken = tokenFactory.getAccessToken();

                req.headers.authorization = 'Bearer ' + accessToken;
                accessTokenGuard.handler(req, res, next);
                expect(res.statusCode).toBe(200);

                const message = new Error('Teste Error : ').message;
                expect(logProvider.writeError).not.toBeCalled();
                expect(resProvider.getFailureForm).not.toBeCalled();

                expect(tokenFactory.verifyToken).toBeCalled();
                expect(tokenFactory.verifyToken).toBeCalledWith(accessToken);
                expect(next).toBeCalled();

            });

        }); // End of AccessTokenGuards Test

        describe ('RefreshTokenGuards', () => {

            beforeEach(() => {
                refreshTokenGuard = new RefreshTokenGuard(logProvider, resProvider, tokenFactory);
            });

            it ('IF no-token, server should return 400', async () => {

                await refreshTokenGuard.handler(req, res, next);
                expect(res.statusCode).toBe(400);

                const message = '엑세스 토큰과 리프레시 토큰이 모두 필요합니다.';
                expect(logProvider.writeError).toBeCalled();
                expect(logProvider.writeError).toBeCalledWith(message);
                expect(resProvider.getFailureForm).toBeCalled();
                expect(resProvider.getFailureForm).toBeCalledWith(message);

                expect(tokenFactory.verifyToken).not.toBeCalled();
                expect(next).not.toBeCalled();

            });

            it ('IF bad-token, server should return 403', async () => {

                const sampleData = { username: 'unchaptered' };
                const wrongSecret = 'secret_keys';
                const wrongAccessToken = jwt.sign({}, wrongSecret);
                const wrongRefreshToken = jwt.sign(sampleData, wrongSecret);

                req.headers.authorization = 'Bearer ' + wrongAccessToken;
                req.headers.refreshtoken = wrongRefreshToken;
                await refreshTokenGuard.handler(req, res, next);
                expect(res.statusCode).toBe(403);

                const message = new Error('Teste Error : ').message;
                expect(logProvider.writeError).toBeCalled();
                expect(logProvider.writeError).toBeCalledWith(message + '토큰을 처음부터 다시 발행해주세요.');
                expect(resProvider.getFailureForm).toBeCalled();
                expect(resProvider.getFailureForm).toBeCalledWith(message + '토큰을 처음부터 다시 발행해주세요.');

                expect(tokenFactory.verifyToken).toBeCalled();
                expect(tokenFactory.verifyToken).toBeCalledWith(wrongRefreshToken);
                expect(next).not.toBeCalled();

            });

            it ('If good-token, server call next', async () => {

                const sampleData = { username: 'unchaptered' };
                const accessToken = tokenFactory.getAccessToken();
                const refreshToken = tokenFactory.getRefreshToken(sampleData);

                req.headers.authorization = 'Bearer ' + accessToken;
                req.headers.refreshtoken = refreshToken;
                await refreshTokenGuard.handler(req, res, next);
                expect(res.statusCode).toBe(201);

                const message = new Error('Teste Error : ').message;
                expect(logProvider.writeError).not.toBeCalled();
                expect(resProvider.getFailureForm).not.toBeCalled();

                expect(tokenFactory.verifyToken).toBeCalled();
                expect(tokenFactory.verifyToken).toBeCalledWith(refreshToken);
                expect(next).not. toBeCalled();

            });

        }); // End of RefreshTokenGuards Test

    });

});