import 'reflect-metadata';
import { inject } from 'inversify';
import { controller, httpGet, httpPost, requestBody } from 'inversify-express-utils';

// di
import { PATHS } from '../../constants/paths.enum';
import { MODULES } from '../../constants/modules.symbol';
import { FILTERS } from '../../constants/filter.symbol';

// dtos
import { IForm, IUser, IUserDetail } from '../../models/interface.loader';

// Providers
import { JoiProvider, LoggerProvider, ResponseProvider } from '../../modules/module.loader';
import { HomeService } from './home.service';


@controller(PATHS.Home)
export class HomeController {

    constructor(
        @inject(MODULES.JoiProvider) private joiProvider: JoiProvider,
        @inject(MODULES.LoggerProvider) private loggerProvider: LoggerProvider,
        @inject(MODULES.ResponseProvider) private resProvider: ResponseProvider,
        
        @inject(MODULES.HomeService) private homeService: HomeService
    ) {}

    @httpGet('/')
    public get(): string {

        return this.homeService.get();
    }

    @httpPost('/join', FILTERS.Join)
    public async join(@requestBody() user: IUserDetail): Promise<IForm> {

        return this.resProvider.getSuccessForm('회원가입에 성공하셨습니다.', user);

    }

    @httpPost('/login', FILTERS.Login)
    public async login(@requestBody() user: IUser): Promise<IForm> {

        return this.resProvider.getSuccessForm('로그인에 성공하셨습니다.', user);

    }
    
}