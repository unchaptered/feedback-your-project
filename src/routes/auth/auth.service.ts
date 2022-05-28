import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';

// di
import { MODULES } from '../../constants/modules.symbol';

// Provider
import { AuthRepository } from './auth.repository';

@provide(MODULES.AuthService)
export class AuthService {

    constructor(
        @inject(MODULES.AuthRepository) private authRepository: AuthRepository
    ) {}

    public get() {
        return this.authRepository.get();
    }

}