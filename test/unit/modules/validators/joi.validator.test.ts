import 'reflect-metadata';

// Testing Module
import { JoiValidator } from '../../../../src/modules/module.loader';
import { BaseModule } from '../../../../src/modules/base/base.modules';

describe ('Joi Validator', () => {

    let joiValidator: JoiValidator;

    beforeAll(() => {
        joiValidator = new JoiValidator();
    });
    
    describe ('properties', () => {

        it ('has 1 functions', () => expect(joiValidator.validate).toBeDefined());
        it ('extends Base Module', () => expect(joiValidator).toBeInstanceOf(BaseModule));
    
    });
    
});