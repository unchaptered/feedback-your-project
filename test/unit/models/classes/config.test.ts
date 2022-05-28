// Testing Module
import { Config } from '../../../../src/models/class.loader';


describe ('Config', () => {

    it ('is @@iterable implementation body of Config', () => {

        const config = new Config();

        expect(config?.PORT).toBeUndefined();
        expect(config?.PG_POOL?.HOST).toBeUndefined();
        expect(config?.PG_POOL?.USER).toBeUndefined();
        expect(config?.PG_POOL?.DATABASE).toBeUndefined();
        expect(config?.PG_POOL?.PASSWORD).toBeUndefined();
        expect(config?.PG_POOL?.PORT).toBeUndefined();

        if (config?.PG_POOL) expect(config?.PG_POOL[Symbol.iterator]).toBeDefined();
        if (config) expect(config[Symbol.iterator]).toBeDefined();

    });

});