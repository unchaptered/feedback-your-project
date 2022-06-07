import { provide } from 'inversify-binding-decorators';

// DI Constants
import { PROVIDERS } from '../../constants/constant.loader';
import { IResponseProvider } from './interfaces/i.response.providers';

// Dtos (Classes & Interfaces)
import { IForm } from '../../models/interface.loader';
import { SuccessForm, FailureForm } from '../../models/class.loader';


@provide(PROVIDERS.ResponseProvider)
export class ResponseProvider implements IResponseProvider {

    public getSuccessForm(message: string, data:Object): IForm {
        return new SuccessForm(message, data);
    }

    public getFailureForm(message: string): IForm {
        return new FailureForm(message);
    }

}