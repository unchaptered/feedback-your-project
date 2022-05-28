// Testing Modules
import { Form, SuccessForm, FailureForm } from '../../../../src/models/class.loader';

// Creator
import mockCreator from '../../../mock/mock.creator';

describe ('Form', () => {

    it ('has 3 properties, without iterator', () => {

        const form: Form = mockCreator.form.createForm();

        expect(form.isSuccess).toBeDefined();
        expect(form.message).toBeDefined();
        expect(form.result).toBeDefined();

    });

});

describe ('SuccessForm', () => {

    it ('has 3 properties, without iterator', () => {

        const form: SuccessForm = mockCreator.form.createSuccessForm();

        expect(form.isSuccess).toBeDefined();
        expect(form.message).toBeDefined();
        expect(form.result).toBeDefined();

    });

});

describe ('FailureForm', () => {

    it ('has 3 properties, without iterator', () => {

        const form: FailureForm = mockCreator.form.createFailureForm();

        expect(form.isSuccess).toBeDefined();
        expect(form.message).toBeDefined();
        expect(form.result).toBeDefined();

    });

});