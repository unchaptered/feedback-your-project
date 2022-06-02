import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';

// Testing Modules
import { createContainer } from '../../src/container';
import { createServer } from '../../src/server';

// Symbol Constants
import { MODULES, FILTERS, GUARDS, JOYS } from '../../src/constants/constant.loader';


describe('createServer', () => {

    afterAll(() => {
        jest.clearAllMocks();
    });

    it ('Container return InversifyExpressServer', () => {

        const container = createContainer(MODULES, FILTERS, GUARDS, JOYS);
        const server = createServer(container);

        expect(server instanceof InversifyExpressServer).toBeTruthy();

    });

});