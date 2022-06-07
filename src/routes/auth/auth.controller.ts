import 'reflect-metadata';
import { inject } from 'inversify';
import { JsonResult } from 'inversify-express-utils/lib/results';
import { controller, httpPost, requestBody } from 'inversify-express-utils';

// DI Constatns
import { PATHS, GUARDS, SERVICES, PROVIDERS, BUILDERS } from '../../constants/constant.loader';

// Classes (Layer & Modules)
import { BaseController } from '../base/base.controller';
import { AuthService } from '../service.loader';
import { DtoBuilder, LoggerProvider, ResponseProvider } from '../../modules/module.loader';

// Dtos (Classes & Interfaces)
import { CustomException } from '../../models/class.loader';
import { IDevForToken } from '../../models/interface.loader';


@controller(PATHS.Auth)
export class AuthController extends BaseController {
    
    constructor(
        // Layer
        @inject(SERVICES.AuthService) private authService: AuthService,

        // Modules
        @inject(BUILDERS.DtoBuilder) private dtoBuilder: DtoBuilder,
        @inject(PROVIDERS.LoggerProvider) private logProvider: LoggerProvider,
        @inject(PROVIDERS.ResponseProvider) private resProvider: ResponseProvider,
    ) {
        super()
    }
    

    // 토큰 신규 발행
    @httpPost('/token')
    public async publishToken(@requestBody() iDev: IDevForToken): Promise<JsonResult> {

        try {

            const dto = await this.dtoBuilder.getDevForToken(iDev);

            const [ accessToken, refreshToken ] = await this.authService.publishToken(dto);
            
            return this.json(
                this.resProvider.getSuccessForm('토큰 발행에 성공하였습니다.', { accessToken, refreshToken }),
                201);
         
            
            // const [ res, statusCode ] = await this.authService.publishToken(iDev);

            // this.logProvider.write(res.isSuccess, res.message);
            // return this.json(res, statusCode);

        } catch (err) {

            const result: CustomException = this.errorHandler(err);
            return this.json(
                this.resProvider.getFailureForm(`${result.name} : ${result.message}`),
                result.statusCode);

        }
        
    }

    // 엑세스 토큰 재발행, 리프레쉬 토큰 필요
    @httpPost('/re/token', GUARDS.RefreshTokenGuard)
    public republishAccessToken() {
        // Guards 에서 재발행외 되고 있습니다.
    }
    
}