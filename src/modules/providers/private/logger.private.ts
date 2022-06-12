import * as winston from 'winston';
import * as winstonDaily from 'winston-daily-rotate-file';

export const getTimeFormat = (): winston.Logform.Format => winston.format.timestamp({ format: 'YY-MM-DD HH-mm' });

export const getStringFormat = (): winston.Logform.Format => winston.format.printf(info => `$${info.timestamp} # ${info.level} # ${info.message}`);

export const getPassTrans = (logDir: string): winstonDaily.DailyRotateFileTransportOptions => {
    return {
        level: 'info',
        dirname: logDir,
        filename: '%DATE%.log',
        maxFiles: 30,
        zippedArchive: true,
        datePattern: 'YY-MM-DD',
    };
};

export const getErrTrans = (logDir: string): winstonDaily.DailyRotateFileTransportOptions => {

    return {
        level: 'error',
        dirname: logDir + '/error',
        filename: '%DATE%.error.log',
        maxFiles: 30,
        zippedArchive: true,
        datePattern: 'YY-MM-DD',
    };
    
};

export const getWinstonDailyByTransport = (transport: winstonDaily.DailyRotateFileTransportOptions): winstonDaily => {

    return new winstonDaily(transport);

};

export const setWinstonInstance = (formats: winston.Logform.Format[], transports: winstonDaily[]): winston.Logger => {

    return winston.createLogger({
        format: winston.format.combine( ...formats ),
        transports: [ ...transports ]
    });

}