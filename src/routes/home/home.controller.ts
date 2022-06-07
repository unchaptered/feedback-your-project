import 'reflect-metadata';
import { inject } from 'inversify';
import { JsonResult } from 'inversify-express-utils/lib/results';
import { controller, httpGet, httpPost, requestBody } from 'inversify-express-utils';

// DI Constatns
import { PATHS, SERVICES, BUILDERS, PROVIDERS } from '../../constants/constant.loader';

// Classes (Layer & Modules)
import { BaseController } from '../base/base.controller';
import { HomeService } from './home.service';
import { DtoBuilder,  LoggerProvider, ResponseProvider } from '../../modules/module.loader';

// Dtos (Classes & Interfaces)
import { CustomException } from '../../models/class.loader';
import { IDevForJoin, IDevForLogin } from '../../models/interface.loader';


@controller(PATHS.Home)
export class HomeController extends BaseController {

    constructor(
        // Layers
        @inject(SERVICES.HomeService) private homeService: HomeService,

        // Modules
        @inject(BUILDERS.DtoBuilder) private dtoBuilder: DtoBuilder,
        @inject(PROVIDERS.LoggerProvider) private logProvider: LoggerProvider,
        @inject(PROVIDERS.ResponseProvider) private resProvider: ResponseProvider
    ) {
        super();
    }

    @httpGet('/')
    public get() {}

    @httpPost('/join')
    public async join(@requestBody() iDev: IDevForJoin): Promise<JsonResult> {

        try {

            const dto = await this.dtoBuilder.getDevForJoin(iDev);
            const result = await this.homeService.join(dto);

            if (result.rowCount > 0) // INSERT 문의 rowCounts 가 0 보다 커야한다.
                return this.json(
                    this.resProvider.getSuccessForm('회원가입이 성공하였습니다.', iDev),
                    201);

            else
                return this.json(
                    this.resProvider.getFailureForm('알 수 없는 에러가 발생하였습니다.'),
                    500);

        } catch (err) {
            
            const result: CustomException = this.errorHandler(err);
            return this.json(
                this.resProvider.getFailureForm(`${result.name} : ${result.message}`),
                result.statusCode);
            
        }

    }

    @httpPost('/login')
    public async login(@requestBody() iDev: IDevForLogin): Promise<JsonResult> {

        try {

            const dto = await this.dtoBuilder.getDevForLogin(iDev);
            const result = await this.homeService.login(dto);

            if (result.rowCount > 0) // SELECT 문의 rowCounts 가 0 보다 커야한다.
                return this.json(
                    this.resProvider.getSuccessForm('로그인이 성공하였습니다.', result.rows[0]),
                    201);

            else
                return this.json(
                    this.resProvider.getFailureForm('알 수 없는 에러가 발생하였습니다.'), 
                    500);

        } catch (err) {

            const result: CustomException = this.errorHandler(err);
            return this.json(
                    this.resProvider.getFailureForm(`${result.name} : ${result.message}`),
                    result.statusCode);

        }

    }
    
}