import 'reflect-metadata';
import { inject } from 'inversify';
import { BaseHttpController, controller, httpPost, requestBody } from 'inversify-express-utils';
import { JsonResult } from 'inversify-express-utils/lib/results';

// di
import { PATHS, MODULES, FILTERS, GUARDS } from '../../constants/constant.loader';

// dtos
import { IDevForLogin, IDevForToken } from '../../models/interface.loader';

// Providers
import { LoggerProvider } from '../../modules/module.loader';
import { AuthService } from '../service.loader';

@controller(PATHS.Auth)
export class AuthController extends BaseHttpController {
    
    constructor(
        @inject(MODULES.LoggerProvider) private logProvider: LoggerProvider,
        @inject(MODULES.AuthService) private authService: AuthService,
    ) {
        super()
    }

    // 토큰 신규 발행
    @httpPost('/token', FILTERS.IDevForToken)
    public async publishToken(@requestBody() iDev: IDevForToken): Promise<JsonResult> {

        const [ res, statusCode ] = await this.authService.publishToken(iDev);

        this.logProvider.write(res.isSuccess, res.message);
        return this.json(res, statusCode);
        
    }

    // 엑세스 토큰 재발행, 리프레쉬 토큰 필요
    @httpPost('/re/token', GUARDS.refreshToken)
    public republishAccessToken() {
        // Guards 에서 재발행외 되고 있습니다.
    }
    
}