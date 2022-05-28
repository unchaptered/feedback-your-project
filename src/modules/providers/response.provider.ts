import { provide } from 'inversify-binding-decorators';

// di
import { MODULES } from '../../constants/modules.symbol';

// dtos
import { IForm } from '../../models/interface.loader';
import { SuccessForm, FailureForm } from '../../models/class.loader';

interface IResponseProvider {

    getSuccessForm: Function;
    getFailureForm: Function;
    
}

@provide(MODULES.ResponseProvider)
export class ResponseProvider implements IResponseProvider {

    public getSuccessForm(message: string, data:Object): IForm {
        return new SuccessForm(message, data);
    }

    public getFailureForm(message: string): IForm {
        return new FailureForm(message);
    }

}