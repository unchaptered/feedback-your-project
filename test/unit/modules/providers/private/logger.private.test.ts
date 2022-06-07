import * as winston from 'winston';
import * as winstonDaily from 'winston-daily-rotate-file';

// Testing Module
import * as LoggerPrivate from '../../../../../src/modules/providers/private/logger.private';


describe ('Logger Private', () => {

    it ('has 7 properties', () => {

        expect(LoggerPrivate.getTimeFormat).toBeDefined();
        expect(LoggerPrivate.getStringFormat).toBeDefined();
        expect(LoggerPrivate.getPassTrans).toBeDefined();
        expect(LoggerPrivate.getErrTrans).toBeDefined();
        expect(LoggerPrivate.getWinstonDailyByTransport).toBeDefined();
        expect(LoggerPrivate.setWinstonInstance).toBeDefined();
        
    });

    describe ('getTimeFormat', () => {

        it ('should return winston.LogForm.Format', () => {

            const format = LoggerPrivate.getTimeFormat();
            expect(format).toBeDefined();

        });

    });

    describe ('getStringFormat', () => {

        it ('should return winston.LogForm.Format', () => {

            const format = LoggerPrivate.getStringFormat();
            expect(format).toBeDefined();

        });

    });

    // describe ('getBaseTrans', () => {

    //     it ('should return instance, having 3 properties', () => {

    //         const format = LoggerPrivate.getBaseTrans('samples');

    //         expect(Object.keys(format).length).toBe(3);

    //         expect(format?.datePattern).toBeDefined();
    //         expect(format?.maxFiles).toBeDefined();
    //         expect(format?.zippedArchive).toBeDefined();

    //     });

    // });

    describe ('getPassTrans / getErrTrans', () => {
       
        it ('should return instance, having 6 properties and calling getBaseTrans', () => {

            const passTrans = LoggerPrivate.getPassTrans('samples');

            expect(Object.keys(passTrans).length).toBe(6);

            expect(passTrans?.datePattern).toBeDefined();
            expect(passTrans?.maxFiles).toBeDefined();
            expect(passTrans?.zippedArchive).toBeDefined();

            expect(passTrans?.level).toBeDefined();
            expect(passTrans?.dirname).toBeDefined();
            expect(passTrans?.filename).toBeDefined();

            const errTrams = LoggerPrivate.getErrTrans('samples');

            expect(Object.keys(errTrams).length).toBe(6);

            expect(errTrams?.datePattern).toBeDefined();
            expect(errTrams?.maxFiles).toBeDefined();
            expect(errTrams?.zippedArchive).toBeDefined();

            expect(errTrams?.level).toBeDefined();
            expect(errTrams?.dirname).toBeDefined();
            expect(errTrams?.filename).toBeDefined();

        });

    });

    describe ('getWinstonDailyByTransport', () => {

        it ('should return winstonDaily', () => {
            
            const passTrans = LoggerPrivate.getPassTrans('samples');
            const winston = LoggerPrivate.getWinstonDailyByTransport(passTrans);

            expect(winston instanceof winstonDaily).toBeTruthy();

        });

    });


    describe ('setWinstonInstance', () => {

        it ('should return winston.logger', () => {

            const formats = [
                LoggerPrivate.getTimeFormat(),
                LoggerPrivate.getStringFormat()
            ];

            
            const winston = [
                LoggerPrivate.getWinstonDailyByTransport(
                    LoggerPrivate.getPassTrans('samples')
                )
            ];

            const logger = LoggerPrivate.setWinstonInstance(formats, winston);
            expect(logger).toBeDefined();

        });

    });

});