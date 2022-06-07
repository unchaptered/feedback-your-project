import { ParsedQs } from 'qs';
import { inject } from 'inversify';
import * as express from 'express';
import { provide } from 'inversify-binding-decorators';
import { BaseMiddleware } from 'inversify-express-utils';
import { ParamsDictionary } from 'express-serve-static-core';

// di
import { GUARDS, FACTORIES, PROVIDERS } from '../../constants/constant.loader';

// modules
import { LoggerProvider, ResponseProvider, TokenFactory } from '../../modules/module.loader';


@provide(GUARDS.AccessTokenGuard)
export class AccessTokenGuard extends BaseMiddleware {

    constructor(
        @inject(PROVIDERS.LoggerProvider) private logProvider: LoggerProvider,
        @inject(PROVIDERS.ResponseProvider) private resProvider: ResponseProvider,
        @inject(FACTORIES.TokenFactory) private tokenFactory: TokenFactory
    ) {
        super()
    }

    public handler(
        req: express.Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
        res: express.Response<any, Record<string, any>>,
        next: express.NextFunction
    ) {

        const accessToken = req.headers.authorization?.split('Bearer ')[1];
        if (!accessToken) {

            this.logProvider.writeError('엑세스 토큰이 누락되었습니다.');
            return res.status(400).json(
                this.resProvider.getFailureForm('엑세스 토큰이 누락되었습니다.')
            );
            
        }

        const result = this.tokenFactory.verifyToken(accessToken);
        if (result instanceof Error) {
            
            this.logProvider.writeError(result.message);
            return res.status(403).json(
                this.resProvider.getFailureForm(result.message)
            );

        }
    
        return next();

    }

}