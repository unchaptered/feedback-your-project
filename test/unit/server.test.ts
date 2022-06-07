import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';

// Testing Modules
import { createContainer } from '../../src/container';
import { createServer } from '../../src/server';

// Symbol Constants
import { CLASSES } from '../../src/constants/constant.loader';


describe('createServer', () => {

    afterAll(() => {
        jest.clearAllMocks();
    });

    it ('Container return InversifyExpressServer', () => {

        const container = createContainer(CLASSES);
        const server = createServer(container);

        expect(server instanceof InversifyExpressServer).toBeTruthy();

    });

});