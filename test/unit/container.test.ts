import 'reflect-metadata';
import { Container } from 'inversify';

// Testing Modules
import { createContainer } from '../../src/container';

// Symbol Constants
import { MODULES } from '../../src/constants/modules.symbol';
import { FILTERS } from '../../src/constants/filter.symbol';

describe('creaetContainer', () => {

    it ('I_MODULES return Container', () => {

        const container = createContainer(MODULES, FILTERS);

        expect(container instanceof Container).toBeTruthy();

    });

});