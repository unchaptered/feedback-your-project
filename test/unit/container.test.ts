import 'reflect-metadata';
import { Container } from 'inversify';

// Testing Modules
import { createContainer } from '../../src/container';

// Symbol Constants
import { CLASSES } from '../../src/constants/constant.loader';


describe('creaetContainer', () => {

    it ('I_MODULES return Container', () => {

        const container = createContainer(CLASSES);

        expect(container instanceof Container).toBeTruthy();

    });

});