import 'reflect-metadata';
import { Container } from 'inversify';

// Testing Modules
import { createContainer } from '../../src/container';

// Symbol Constants
import { MODULES, FILTERS, GUARDS, JOYS } from '../../src/constants/constant.loader';


describe('creaetContainer', () => {

    it ('I_MODULES return Container', () => {

        const container = createContainer(MODULES, FILTERS, GUARDS, JOYS);

        expect(container instanceof Container).toBeTruthy();

    });

});