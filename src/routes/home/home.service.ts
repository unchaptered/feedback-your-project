import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';

// di
import { MODULES } from '../../constants/modules.symbol';

// provider
import { HomeRepository } from './home.repository';

@provide(MODULES.HomeService)
export class HomeService {

    constructor(
        @inject(MODULES.HomeRepository) private homeRepository: HomeRepository
    ) {}

    public get() {
        return this.homeRepository.get();
    }

}