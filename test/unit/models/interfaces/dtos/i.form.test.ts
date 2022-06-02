// Testing Module
import { IForm } from '../../../../../src/models/interface.loader';

// Creator
import mockCreator from '../../../../mock/mock.creator';


describe ('IForm', () => {

    it ('has 3 properties, without iterator', () => {

        const form: IForm = mockCreator.iForm.createIForm();

        expect(form.isSuccess).toBeDefined();
        expect(form.message).toBeDefined();
        expect(form.result).toBeDefined();

    });

});