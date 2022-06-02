import * as ConfigPrivate from '../../../../../src/models/classes/configs/config.private';
import * as ObjectIterator from '../../../../../src/models/iterator.loader';


describe ('isValid', () => {

    const inValidObjectA = {
        name: 'hello',
        age: undefined,
        location: {
            planet: 'earth',
            continent: 'asia'
        },
        [Symbol.iterator]: ObjectIterator.generator
    };

    const inValidObjectB = {
        name: 'hello',
        age: 23,
        location: {
            planet: 'earth',
            continent: undefined
        },
        [Symbol.iterator]: ObjectIterator.generator
    };


    it ('should throw Error', () => expect(() => ConfigPrivate.isValid(inValidObjectA)).toThrowError());
    it ('should throw Error', () => expect(() => ConfigPrivate.isValid(inValidObjectB)).toThrowError());

    
});