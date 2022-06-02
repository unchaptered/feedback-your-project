import { ParsedQs } from 'qs';
import { inject } from 'inversify';
import { JwtPayload } from 'jsonwebtoken';
import * as express from 'express';
import { provide } from 'inversify-binding-decorators';
import { BaseMiddleware } from 'inversify-express-utils';
import { ParamsDictionary } from 'express-serve-static-core';

// di
import { GUARDS, MODULES } from '../../constants/constant.loader';

// modules
import { LoggerProvider, ResponseProvider, TokenFactory } from '../../modules/module.loader';
import { string } from 'joi';


@provide(GUARDS.refreshToken)
export class RefreshTokenGuard extends BaseMiddleware {

    constructor(
        @inject(MODULES.LoggerProvider) private logProvider: LoggerProvider,
        @inject(MODULES.ResponseProvider) private resProvider: ResponseProvider,
        @inject(MODULES.TokenFactory) private tokenFactory: TokenFactory
    ) {
        super()
    }

    public async handler(
        req: express.Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
        res: express.Response<any, Record<string, any>>,
        next: express.NextFunction
    ) {

        const accessToken = req.headers.authorization?.split('Bearer ')[1];
        const refreshToken = req.headers.refreshtoken instanceof Array ?
                                req.headers?.refreshtoken[0] :
                                req.headers?.refreshtoken;

        if (!accessToken || !refreshToken) {

            this.logProvider.writeError('엑세스 토큰과 리프레시 토큰이 모두 필요합니다.');
            return res.status(400).json(
                this.resProvider.getFailureForm('엑세스 토큰과 리프레시 토큰이 모두 필요합니다.')
            );
        }

        const result = this.tokenFactory.verifyToken(refreshToken);
        if (result instanceof Error) {
            
            this.logProvider.writeError(result.message + '토큰을 처음부터 다시 발행해주세요.');
            return res.status(403).json(
                this.resProvider.getFailureForm(result.message + '토큰을 처음부터 다시 발행해주세요.')
            );
        }

        
        const { payload: { email } } = result;
        const newAccessToken = this.tokenFactory.getAccessToken();

        this.logProvider.writeInfo('엑세스 토큰이 재발행 되었습니다.' + JSON.stringify(email));
        return res.status(201).json(
            this.resProvider.getSuccessForm('엑세스 토큰이 재발행 되었습니다.' + JSON.stringify(email), {
                accessToken: newAccessToken,
                refreshToken
            })
        );
    
    }

}