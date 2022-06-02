import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';

// di
import { JOYS, MODULES } from '../../constants/constant.loader';

// dtos
import { IDevForJoin, IDevForLogin, IDevForToken } from '../../models/interface.loader';
import { JoiIDevForLogin, JoiIDevForJoin, JoiIDevForToken } from '../../models/class.loader';

// private
import * as JoiPrivate from './private/joi.private';


@provide(MODULES.JoiProvider)
export class JoiProvider  {

    constructor(
        @inject(JOYS.iDevForLogin) private joyIDevForLogin: JoiIDevForLogin,
        @inject(JOYS.iDevForJoin) private joyIDevForJoin: JoiIDevForJoin,
        @inject(JOYS.iDevForToken) private joiIDevForToken: JoiIDevForToken
    ) {}

    private errHandler = JoiPrivate.errHandler;

    public async validateIDevForJoin(iDev: IDevForJoin): Promise<IDevForJoin | Error> {

        try {
            return await this.joyIDevForJoin.getInstance().validateAsync({ ...iDev });
        } catch (err) {
            return this.errHandler(err);
        }

    }

    public async validateIDevForLogin(iDev: IDevForLogin): Promise<IDevForLogin | Error> {

        try {
            return await this.joyIDevForLogin.getInstance().validateAsync({ ...iDev });
        } catch (err) {
            return this.errHandler(err);
        }

    }

    public async validateIDevForToken(iDev: IDevForToken): Promise<IDevForToken | Error> {

        try {
            return await this.joiIDevForToken.getInstance().validateAsync({ ...iDev });
        } catch (err) {
            return this.errHandler(err);
        }
        
    }

}