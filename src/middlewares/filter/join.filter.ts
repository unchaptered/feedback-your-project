import { ParsedQs } from 'qs';
import { inject } from 'inversify';
import * as express from 'express';
import { provide } from 'inversify-binding-decorators';
import { BaseMiddleware } from 'inversify-express-utils';
import { ParamsDictionary } from 'express-serve-static-core';

// di
import { MODULES } from '../../constants/modules.symbol';
import { FILTERS } from '../../constants/filter.symbol';

// Dto
import { IUserDetail } from '../../models/interface.loader';

// Modules
import { JoiProvider, LoggerProvider, ResponseProvider } from '../../modules/module.loader';


@provide(FILTERS.Join)
export class JoinFilter extends BaseMiddleware {

    constructor(
        @inject(MODULES.JoiProvider) private joiProvider: JoiProvider,
        @inject(MODULES.LoggerProvider) private loggerProvider: LoggerProvider,
        @inject(MODULES.ResponseProvider) private resProvider: ResponseProvider
    ) {
        super()
    }

    public async handler(
        req: express.Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
        res: express.Response<any, Record<string, any>>,
        next: express.NextFunction
    ) {
        
        const user: IUserDetail | Error = await this.joiProvider.validateUserDetail(req?.body);
        if (user instanceof Error) {

            this.loggerProvider.writeInfo(user.message);
            return res.status(400).json(
                this.resProvider.getFailureForm(user.message)
            );
        
        }

        return next();

    }

}