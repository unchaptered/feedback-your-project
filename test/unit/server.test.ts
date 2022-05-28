import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';

// Testing Modules
import { createContainer } from '../../src/container';
import { createServer } from '../../src/server';

// Symbol Constants
import { MODULES } from '../../src/constants/modules.symbol';
import { FILTERS } from '../../src/constants/filter.symbol';

describe('createServer', () => {

    afterAll(() => {
        jest.clearAllMocks();
    });

    it ('Container return InversifyExpressServer', () => {

        const container = createContainer(MODULES, FILTERS);
        const server = createServer(container);

        expect(server instanceof InversifyExpressServer).toBeTruthy();

    });

});