import * as winston from 'winston'
import * as winstonDaily from 'winston-daily-rotate-file';
import { provide } from 'inversify-binding-decorators';

// DI Constants
import { PROVIDERS } from '../../constants/constant.loader';
import { ILoggerProvider } from './interfaces/i.logger.provider';
import * as LoggerPrivate from './private/logger.private';


@provide(PROVIDERS.LoggerProvider)
export class LoggerProvider implements ILoggerProvider {

    static logger: winston.Logger;

    static initialize(logDir: string): winston.Logger {
        
        const formats: winston.Logform.Format[] = [
            LoggerPrivate.getTimeFormat(),
            LoggerPrivate.getStringFormat()
        ];

        const trans: winstonDaily[] = [
            LoggerPrivate.getWinstonDailyByTransport(LoggerPrivate.getPassTrans(logDir)),
            LoggerPrivate.getWinstonDailyByTransport(LoggerPrivate.getErrTrans(logDir))
        ];

        const logger: winston.Logger = LoggerPrivate.setWinstonInstance(formats, trans);

        this.logger = logger;

        return this.logger;

    }

    public write(isSuccess: boolean, ip: string, message: string) {

        if (isSuccess) this.writeInfo(ip, message);
        else this.writeError(ip, message);
        
    }

    public writeInfo(ip:string, message: string) {
        LoggerProvider?.logger?.info(`${ip} : ${message}`);
    }

    public writeError(ip:string, message: string) {
        LoggerProvider?.logger?.error(`${ip} : ${message}`);
    }

}