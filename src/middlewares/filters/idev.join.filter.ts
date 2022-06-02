import { ParsedQs } from 'qs';
import { inject } from 'inversify';
import * as express from 'express';
import { provide } from 'inversify-binding-decorators';
import { BaseMiddleware } from 'inversify-express-utils';
import { ParamsDictionary } from 'express-serve-static-core';

// di
import { MODULES, FILTERS } from '../../constants/constant.loader';

// Dto
import { IDevForJoin } from '../../models/interface.loader';

// Modules
import { JoiProvider, LoggerProvider, ResponseProvider } from '../../modules/module.loader';


@provide(FILTERS.IDevForJoin)
export class IDevForJoinFilter extends BaseMiddleware {

    constructor(
        @inject(MODULES.JoiProvider) private joiProvider: JoiProvider,
        @inject(MODULES.LoggerProvider) private logProvider: LoggerProvider,
        @inject(MODULES.ResponseProvider) private resProvider: ResponseProvider
    ) {
        super()
    }

    public async handler(
        req: express.Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
        res: express.Response<any, Record<string, any>>,
        next: express.NextFunction
    ) {

        const iDev: IDevForJoin | Error = await this.joiProvider.validateIDevForJoin(req?.body);
        if (iDev instanceof Error) {

            this.logProvider.writeError(iDev.message);
            return res.status(400).json(
                this.resProvider.getFailureForm(iDev.message));
        
        }

        return next();

    }

}