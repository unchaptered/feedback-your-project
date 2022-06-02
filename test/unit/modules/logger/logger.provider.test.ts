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

    describe ('logics', () => {

        beforeEach(() => {
            jest.spyOn(LoggerProvider.logger, 'info');
            jest.spyOn(LoggerProvider.logger, 'error');
        });
        afterEach(() =>{
            jest.clearAllMocks();
        });

        it ('writeInfo should call Provider.logger.info', () => {
            
            logProvider.writeInfo('success');
            expect(LoggerProvider.logger.info).toBeCalled();
            expect(LoggerProvider.logger.info).toBeCalledWith('success');

        });

        
        it ('writeError should call Provider.logger.info', () => {
            
            logProvider.writeError('success');
            expect(LoggerProvider.logger.error).toBeCalled();
            expect(LoggerProvider.logger.error).toBeCalledWith('success');
            
        });

        describe ('write', () => {

            beforeEach(() => {
                logProvider.writeError = jest.fn();
                logProvider.writeInfo = jest.fn();
            });

            afterEach(() => {
                jest.clearAllMocks();
            });
            
            it ('should calll this.writeInfo', () => {
                logProvider.write(true, 'message');
                expect(logProvider.writeInfo).toBeCalled();
                expect(logProvider.writeError).not.toBeCalled();

                expect(logProvider.writeInfo).toBeCalledWith('message');
            });

            it ('should call this.writeError', () => {
                logProvider.write(false, 'message');
                expect(logProvider.writeInfo).not.toBeCalled();
                expect(logProvider.writeError).toBeCalled();

                expect(logProvider.writeError).toBeCalledWith('message');
            });

        });

    });

});