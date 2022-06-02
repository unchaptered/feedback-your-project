import 'reflect-metadata';
import { inject } from 'inversify';
import { JsonResult } from 'inversify-express-utils/lib/results';
import { BaseHttpController, controller, httpGet, httpPost, requestBody } from 'inversify-express-utils';

// di
import { PATHS, MODULES, FILTERS } from '../../constants/constant.loader';

// dtos
import { IDevForJoin, IDevForLogin } from '../../models/interface.loader';

// Providers
import { LoggerProvider } from '../../modules/module.loader';
import { HomeService } from './home.service';


@controller(PATHS.Home)
export class HomeController extends BaseHttpController {

    constructor(
        @inject(MODULES.HomeService) private homeService: HomeService,
        @inject(MODULES.LoggerProvider) private logProvider: LoggerProvider,
    ) {
        super();
    }

    @httpGet('/')
    public get() {}

    @httpPost('/join', FILTERS.IDevForJoin)
    public async join(@requestBody() iDev: IDevForJoin): Promise<JsonResult> {

        const [ res, statusCode ] = await this.homeService.join(iDev);

        this.logProvider.write(res.isSuccess, res.message);
        return this.json(res, statusCode);

    }

    @httpPost('/login', FILTERS.IDevForToken)
    public async login(@requestBody() iDev: IDevForLogin): Promise<JsonResult> {

        const [ res, statusCode ] = await this.homeService.login(iDev);

        this.logProvider.write(res.isSuccess, res.message);
        return this.json(res, statusCode);

    }
    
}