import 'reflect-metadata';

// Testing Module
import { Config } from '../../../../../src/models/class.loader';

import * as ObjectIterator from '../../../../../src/models/iterator.loader';
import * as ConfigPrivate from '../../../../../src/models/classes/configs/config.private';
import * as FactoryPrivate from '../../../../../src/modules/factories/private/config.private';

jest.spyOn(ConfigPrivate, 'getStringEnv');
jest.spyOn(ConfigPrivate, 'getNumberEnv');
jest.spyOn(ConfigPrivate, 'getAlgorihtmEnv');
jest.spyOn(ConfigPrivate, 'isValid');
jest.spyOn(ObjectIterator, 'generator');

describe ('Config', () => {


    describe ('constructor', () => {
        
        it ('should call 4 privates, 3 generator', () => {

            FactoryPrivate.setConfigPathByOption(
                FactoryPrivate.getOptionInstance('prod')
            );

            expect(() => new Config()).toThrowError();

            expect(ConfigPrivate.getNumberEnv).toBeCalledTimes(2);
            expect(ConfigPrivate.getStringEnv).toBeCalledTimes(8);
            expect(ConfigPrivate.getAlgorihtmEnv).toBeCalledTimes(1);
            expect(ConfigPrivate.isValid).toBeCalledTimes(1);
            // Max Expect Calleed is 4, But undefined throw error.
            expect(ObjectIterator.generator).toBeCalledTimes(2);

        });

    });


});