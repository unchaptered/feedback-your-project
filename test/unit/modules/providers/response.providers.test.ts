import 'reflect-metadata';

// Testing Module
import { ResponseProvider } from '../../../../src/modules/providers/response.provider';

// Dto & Creator
import { FailureForm, SuccessForm } from '../../../../src/models/class.loader';
import mockCreator from '../../../mock/mock.creator';


describe ('Response Provider', () => {

    let resProvider: ResponseProvider;

    beforeAll(() => {
        resProvider = new ResponseProvider();
    });

    describe ('properties', () => {

        it ('2 func', () => {
            
            expect(resProvider.getSuccessForm).toBeDefined();
            expect(resProvider.getFailureForm).toBeDefined();

        });

    });

    describe ('get(***)Form return (***)Form', () => {

        it ('getSuccessForm return SuccessForm', () => {

            const { message, result } = mockCreator.iForm.createIForm();
            const form = resProvider.getSuccessForm(message, result);

            expect(form instanceof SuccessForm).toBeTruthy();

        });

        it ('getFailureForm return FailureForm', () => {

            const { message } = mockCreator.iForm.createIForm();
            const form = resProvider.getFailureForm(message);

            expect(form instanceof FailureForm).toBeTruthy();

        });

    });

});