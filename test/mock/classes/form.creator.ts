import * as faker from 'faker';

// Mock Target
import { Form, SuccessForm, FailureForm } from '../../../src/models/class.loader';


export const createForm = (): Form => {

    return new Form(
        craeteBoolean(),
        createMessage(),
        createObject()
    );

};
export const createSuccessForm = (): SuccessForm => {

    return new SuccessForm(
        createMessage(),
        createObject()
    );

};
export const createFailureForm = (): FailureForm => {

    return new FailureForm(
        createMessage()
    );

};

const craeteBoolean = (): boolean => faker.random.boolean();
const createMessage = (): string => faker.random.word();
const createObject = (): Object => faker.random.objectElement();