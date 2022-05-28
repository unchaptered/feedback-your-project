import { provide } from 'inversify-binding-decorators';

// di
import { MODULES } from '../../constants/modules.symbol';

@provide(MODULES.AuthRepository)
export class AuthRepository {

    constructor() {}

    public get() {
        return 'Auth';
    }
    
}