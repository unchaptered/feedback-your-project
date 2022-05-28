import 'reflect-metadata';
// import { inject } from 'inversify';
import { controller, httpGet, httpPost } from 'inversify-express-utils';

// di
import { PATHS } from '../../constants/paths.enum';
// import { MODULES } from '../../constants/modules.symbol';

// Providers
// import { JoiProvider, LoggerProvider, ResponseProvider } from '../../modules/module.loader';
// import { AuthService } from './auth.service';

@controller(PATHS.Auth)
export class AuthController {
    
    constructor(
        // @inject(MODULES.JoiProvider) private joiProvider: JoiProvider,
        // @inject(MODULES.LoggerProvider) private logProvider: LoggerProvider,
        // @inject(MODULES.ResponseProvider) private resProvider: ResponseProvider,

        // @inject(MODULES.AuthService) private authService: AuthService,
    ) {}

    // readAccessToken
    @httpGet('/access-token')
    public readAccessToken() {
    }

    // 토큰 재발행, 두 토큰 다 만료 시 새 토큰 2개 발행
    @httpPost('/access-token')
    public createAccessToken() {

    }
    
}