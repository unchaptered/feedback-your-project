import { provide } from 'inversify-binding-decorators';

// di
import { MODULES } from '../../constants/modules.symbol';

@provide(MODULES.HomeRepository)
export class HomeRepository {

    constructor() {}

    public get() {
        return 'home'
    }

}