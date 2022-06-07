import { IForm } from '../../../models/interface.loader';

/**
 * Blueprint of DevQueryBuilder
 * 
 * Must Realize `2 public functions`
 */
export interface IResponseProvider {

    getSuccessForm(message: string, data:Object): IForm;
    getFailureForm(message: string): IForm;
    
}
