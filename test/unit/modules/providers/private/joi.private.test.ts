import * as JoiPrivate from '../../../../../src/modules/providers/private/joi.private';


describe ('Joi Private', () => {

    it ('has 1 property', () => {

        expect(Object.keys(JoiPrivate).length).toBe(1);

        expect(JoiPrivate.errHandler).toBeDefined();

    });
    
})