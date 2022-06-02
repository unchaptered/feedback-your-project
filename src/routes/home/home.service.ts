import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';

// di
import { MODULES } from '../../constants/constant.loader';

//dto
import { IDevForJoin, IDevForLogin, IForm } from '../../models/interface.loader';
import { BadRequestException, ConflictException, NotFoundException } from '../../models/class.loader';

// provider
import { HomeRepository } from './home.repository';
import { ResponseProvider } from '../../modules/module.loader';


@provide(MODULES.HomeService)
export class HomeService {

    constructor(
        @inject(MODULES.HomeRepository) private homeRepository: HomeRepository,
        @inject(MODULES.ResponseProvider) private resProvider: ResponseProvider
    ) {}

    public async join(iDev: IDevForJoin): Promise<[IForm, number]> {

        const res = await this.homeRepository.join(iDev);
        
        if (res instanceof Error)
            return [
                this.resProvider.getFailureForm(res.message),
                isNaN(+res.name) ? 500 : +res.name];

        else
            return [
                this.resProvider.getSuccessForm('회원가입에 성공하셨습니다.', iDev),
                201];
    }

    public async login(iDev: IDevForLogin): Promise<[IForm, number]> {

        const res = await this.homeRepository.login(iDev);

        if (res instanceof Error) return [ this.resProvider.getFailureForm(res.message), 500];

        else if (res instanceof NotFoundException) return [ this.resProvider.getFailureForm(res.message), 404];

        else if (res instanceof BadRequestException) return [ this.resProvider.getFailureForm(res.message), 400];
        
        else return [this.resProvider.getSuccessForm('로그인에 성공하셨습니다.', res.rows[0]), 201];
        
    }

}