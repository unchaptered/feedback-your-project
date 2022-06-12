import 'reflect-metadata';
import * as faker from 'faker';

// Testing Module
import { LoggerProvider } from '../../../../src/modules/module.loader';


describe ('Logger Provider', () => {

    let logProvider: LoggerProvider;

    let requestIp: string;
    let logMessage: string;

    beforeAll(() => {

        LoggerProvider.initialize('samples');

        logProvider = new LoggerProvider();

        requestIp = faker.internet.ip();
        logMessage = 'message';

    });

    describe ('properties', () => {

        it ('has 2 static functions', () => {

            expect(Object.keys(LoggerProvider).length).toBe(2);
    
            expect(LoggerProvider.logger).toBeDefined();
            expect(LoggerProvider.initialize).toBeDefined();
    
        });
    
        it ('has 3 functions', () => {
    
            expect(logProvider.write).toBeDefined();
            expect(logProvider.writeInfo).toBeDefined();
            expect(logProvider.writeError).toBeDefined();
            
        });
        
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
            
            logProvider.writeInfo(requestIp, logMessage);
            expect(LoggerProvider.logger.info).toBeCalled();
            expect(LoggerProvider.logger.info).toBeCalledWith(`${requestIp} : ${logMessage}`);

        });

        
        it ('writeError should call Provider.logger.info', () => {
            
            logProvider.writeError(requestIp, logMessage);
            expect(LoggerProvider.logger.error).toBeCalled();
            expect(LoggerProvider.logger.error).toBeCalledWith(`${requestIp} : ${logMessage}`);
            
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
                logProvider.write(true, requestIp, logMessage);
                expect(logProvider.writeInfo).toBeCalled();
                expect(logProvider.writeError).not.toBeCalled();

                expect(logProvider.writeInfo).toBeCalledWith(requestIp, logMessage);
            });

            it ('should call this.writeError', () => {
                logProvider.write(false, requestIp, logMessage);
                expect(logProvider.writeInfo).not.toBeCalled();
                expect(logProvider.writeError).toBeCalled();

                expect(logProvider.writeError).toBeCalledWith(requestIp, logMessage);
            });

        });

    });

});