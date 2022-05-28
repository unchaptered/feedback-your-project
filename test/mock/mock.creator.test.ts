// Testing Modules
import { PoolClient } from 'pg';
import mockCreator from './mock.creator';

describe ('Mock Creator', () => {

    describe ('properties', () => {

        it ('9 fn', () => {

            // object for return as dto
            expect(typeof mockCreator?.form?.createForm).toBe('function');
            expect(typeof mockCreator?.form?.createFailureForm).toBe('function');
            expect(typeof mockCreator?.form?.createSuccessForm).toBe('function');
            
            expect(typeof mockCreator?.iForm?.createIForm).toBe('function');
    
            // object for factory as dto
            expect(typeof mockCreator?.iConfig?.craeteIConfig).toBe('function');
            expect(typeof mockCreator?.iPoolConfig?.craeteIPoolConfig).toBe('function');
    
            // object for provider as dto
            expect(typeof mockCreator?.iUser?.createIUser).toBe('function');
            expect(typeof mockCreator?.iUser?.createIUserDetail).toBe('function');
    
            // object for pg as fake
            expect(typeof mockCreator?.pool?.createPoolClient).toBe('function');
            expect(mockCreator?.pool?.createPoolClient()).toBeDefined();
    
        });

    });
});