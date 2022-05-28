import * as winston from 'winston';
import * as winstonDaily from 'winston-daily-rotate-file';

export const getTimeFormat = (): winston.Logform.Format => winston.format.timestamp({ format: 'YY-MM-DD HH-mm' });

export const getStringFormat = (): winston.Logform.Format => winston.format.printf(info => `${info.timestamp} # ${info.level} # ${info.message}`);

export const getBaseTrans = (logDir: string): winstonDaily.DailyRotateFileTransportOptions => {
    return {
        datePattern: 'YY-MM-DD',
        maxFiles: 30,
        zippedArchive: true
    };
};

export const getPassTrans = (logDir: string): winstonDaily.DailyRotateFileTransportOptions => {

    const base = getBaseTrans(logDir);
    base.level = 'info';
    base.dirname = logDir;
    base.filename = '%DATE%.log';

    return base;
};

export const getErrTrans = (logDir: string): winstonDaily.DailyRotateFileTransportOptions => {

    const base = getBaseTrans(logDir);
    base.level = 'error';
    base.dirname = logDir + '/error';
    base.filename = '%DATE%.error.log';

    return base;
    
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