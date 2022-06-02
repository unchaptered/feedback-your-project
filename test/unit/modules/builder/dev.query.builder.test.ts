import 'reflect-metadata';

// Testing Module
import { DevQueryBuilder } from '../../../../src/modules/module.loader';

import mockCreator from '../../../mock/mock.creator';

describe ('Dev Query', () => {

    let devQuery: DevQueryBuilder;

    beforeAll(() => devQuery = new DevQueryBuilder());

    it ('has 7 functions', () => {

        expect(devQuery.isExistsByName).toBeDefined();
        expect(devQuery.isExistsByEamil).toBeDefined();
        expect(devQuery.isExists).toBeDefined();

        expect(devQuery.join).toBeDefined();
        expect(devQuery.login).toBeDefined();

        expect(devQuery.deleteRefreshToken).toBeDefined();
        expect(devQuery.saveRefreshToken).toBeDefined();

    });

    describe ('logics', () => {

        it ('isExistsByName should return string', () =>
            expect(typeof devQuery.isExistsByName('unchaptered')).toBe('string'))

    
        it ('isExistsByEamil should return string', () =>
            expect(typeof devQuery.isExistsByEamil('unchaptered@gmail.com')).toBe('string'))

    
        it ('isExists should return string', () =>
            expect(typeof devQuery.isExists('unchaptered', 'unchaptered@gmail.com')).toBe('string'))

    
        it ('join should return string', () =>
            expect(typeof devQuery.join(
                    mockCreator.Service.iDev.createIDevForJoin()
            )).toBe('string'))

    
        it ('login should return string', () =>
            expect(typeof devQuery.login(
                mockCreator.Service.iDev.createIDevForLogin()
            )).toBe('string'))

    
        it ('deleteRefreshToken should return string', () =>
            expect(typeof devQuery.deleteRefreshToken(9999)).toBe('string'))

    
        it ('saveRefreshToken should return string', () =>
            expect(typeof devQuery.saveRefreshToken(9999,
                mockCreator.token.createFakeToken('secret', { name: 'unchaptered' }))).toBe('string'))

    });

});