import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';

// di
import { MODULES } from '../../constants/constant.loader';

// Dtos
import { IDevForToken, IForm } from '../../models/interface.loader';
import { BadRequestException, NotFoundException } from '../../models/class.loader';

// Providers
import { ResponseProvider, TokenFactory } from '../../modules/module.loader';
import { AuthRepository } from '../repository.loader';


@provide(MODULES.AuthService)
export class AuthService {

    constructor(
        // @inject(MODULES.HomeRepository) private homeRepository: HomeRepository,
        @inject(MODULES.AuthRepository) private authRepository: AuthRepository,
        @inject(MODULES.TokenFactory) private tokenFactory: TokenFactory,
        @inject(MODULES.ResponseProvider) private resProvider: ResponseProvider
    ) {}

    public async publishToken(iDev: IDevForToken): Promise<[IForm, number]> {

        const accessToken = this.tokenFactory.getAccessToken();
        const refreshToken = this.tokenFactory.getRefreshToken({ email: iDev.email });

        const res = await this.authRepository.publishToken(iDev, refreshToken);

        if (res instanceof Error) return [ this.resProvider.getFailureForm(res.message), 500 ];

        else if (res instanceof NotFoundException) return [ this.resProvider.getFailureForm(res.message), 404 ];

        else if (res instanceof BadRequestException) return [ this.resProvider.getFailureForm(res.message), 400 ];

        else return [ this.resProvider.getSuccessForm('토큰이 발행되었습니다.', { accessToken, refreshToken }), 201 ];

    }
    
};