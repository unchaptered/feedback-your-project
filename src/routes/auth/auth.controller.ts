import 'reflect-metadata';
import { inject } from 'inversify';
import { controller, httpGet } from 'inversify-express-utils';

// di
import { PATHS } from '../../constants/paths.enum';
import { MODULES } from '../../constants/modules.symbol';

// Providers
import { JoiProvider, LoggerProvider, ResponseProvider } from '../../modules/module.loader';
import { AuthService } from './auth.service';

@controller(PATHS.Auth)
export class AuthController {
    
    constructor(
        @inject(MODULES.JoiProvider) private joiProvider: JoiProvider,
        @inject(MODULES.LoggerProvider) private logProvider: LoggerProvider,
        @inject(MODULES.ResponseProvider) private resProvider: ResponseProvider,

        @inject(MODULES.AuthService) private authService: AuthService,
    ) {}

    @httpGet('/')
    public get() {
        return this.authService.get();
    }
    
}