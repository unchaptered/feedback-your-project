import 'reflect-metadata';

// Testing Module
import { LoggerProvider } from '../../../../src/modules/module.loader';


describe ('Logger Provider', () => {

    let logProvider: LoggerProvider;

    beforeAll(() => {

        LoggerProvider.initialize('samples');

        logProvider = new LoggerProvider();

    });

    it ('has 2 static properties', () => {

        expect(Object.keys(LoggerProvider).length).toBe(2);

        expect(LoggerProvider.logger).toBeDefined();
        expect(LoggerProvider.initialize).toBeDefined();

    });

    it ('has 2 properties', () => {

        expect(logProvider.writeInfo).toBeDefined();
        expect(logProvider.writeError).toBeDefined();
        
    });

});