import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';

// DI Constants
import { SERVICES, REPOSITORIES, FACTORIES, PROVIDERS } from '../../constants/constant.loader';

// Classes (Layer & Modules)
import { BaseLayer } from '../base/base.layer';
import { AuthRepository } from '../repository.loader';
import { ResponseProvider, TokenFactory } from '../../modules/module.loader';

// Dtos (classes & interfaces)
import { DevForToken } from '../../models/class.loader';


@provide(SERVICES.AuthService)
export class AuthService extends BaseLayer {

    constructor(
        // Layers
        @inject(REPOSITORIES.AuthRepository) private authRepository: AuthRepository,
        // Modules
        @inject(FACTORIES.TokenFactory) private tokenFactory: TokenFactory,
        @inject(PROVIDERS.ResponseProvider) private resProvider: ResponseProvider
    ) {
        super();
    }

    public async publishToken(iDev: DevForToken): Promise<string[]> {

        try {

            const accessToken = this.tokenFactory.getAccessToken();
            const refreshToken = this.tokenFactory.getRefreshToken({ email: iDev.email });

            await this.authRepository.publishToken(iDev, refreshToken);
            
            return [ accessToken, refreshToken ];

        } catch (err) {

            throw this.errorHandler(err);

        }

    }
    
};