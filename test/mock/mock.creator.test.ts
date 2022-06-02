// Testing Modules
import { PoolClient } from 'pg';
import mockCreator from './mock.creator';

describe ('Mock Creator', () => {

    it ('has 13 functions', () => {

        // object for return as dto
        expect(typeof mockCreator?.form?.createForm).toBe('function');
        expect(typeof mockCreator?.form?.createFailureForm).toBe('function');
        expect(typeof mockCreator?.form?.createSuccessForm).toBe('function');
        
        expect(typeof mockCreator?.iForm?.createIForm).toBe('function');

        // object for factory as dto
        expect(typeof mockCreator?.Config?.iConfig?.craeteIConfig).toBe('function');
        expect(typeof mockCreator?.Config?.iLogConfig?.createILogConf).toBe('function');
        expect(typeof mockCreator?.Config?.iPoolConfig?.craeteIPoolConfig).toBe('function');
        expect(typeof mockCreator?.Config?.iTokenConfig?.createITokenConf).toBe('function');

        // object for factory as dto
        expect(typeof mockCreator?.Service?.iDev?.createIDev).toBe('function');
        expect(typeof mockCreator?.Service?.iDev?.createIDevForJoin).toBe('function');
        expect(typeof mockCreator?.Service?.iDev?.createIDevForLogin).toBe('function');
        expect(typeof mockCreator?.Service?.iSite?.createISite).toBe('function');

        // object for pg as fake
        // expect(typeof mockCreator?.pool?.createPoolClient).toBe('function');

        expect(typeof mockCreator?.token?.createFakeToken).toBe('function');
        
        // expect(mockCreator?.pool?.createPoolClient).toBeDefined();

    });

    describe ('[Symbol.iterator] must be working!', () => {

        it ('IConifg', () => 
            expect(() => {
                for (const a of mockCreator?.Config?.iConfig?.craeteIConfig()) {}}).not.toThrowError());

        it ('ILogConfig', () => 
            expect(() => {
                for (const a of mockCreator?.Config?.iLogConfig?.createILogConf()) {}}).not.toThrowError());

        it ('IPoolConfig', () => 
            expect(() => {
                for (const a of mockCreator?.Config?.iPoolConfig?.craeteIPoolConfig()) {}}).not.toThrowError());

        it ('ITokenConfig', () => 
            expect(() => {
                for (const a of mockCreator?.Config?.iTokenConfig?.createITokenConf()) {}}).not.toThrowError());

    });

});