import 'reflect-metadata';

// Testing Module
import { JoiValidator } from '../../../../src/modules/module.loader';
import { BaseModule, BaseValidator } from '../../../../src/modules/base/base.modules';

describe ('Joi Validator', () => {

    let joiValidator: JoiValidator;

    beforeAll(() => {
        joiValidator = new JoiValidator();
    });
    
    describe ('properties', () => {

        it ('has 1 functions', () => expect(joiValidator.validate).toBeDefined());
        it ('extends Base Validator', () => expect(joiValidator).toBeInstanceOf(BaseValidator));
        it ('extends not Base Module', () => expect(joiValidator).not.toBeInstanceOf(BaseModule));
    
    });
    
});