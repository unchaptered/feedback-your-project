import * as winston from 'winston'
import * as winstonDaily from 'winston-daily-rotate-file';
import { provide } from 'inversify-binding-decorators';

// di
import { MODULES } from '../../constants/constant.loader';

// private
import * as LoggerPrivate from './private/logger.private';

@provide(MODULES.LoggerProvider)
export class LoggerProvider {

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

    public write(isSuccess: boolean, message: string) {

        if (isSuccess) this.writeInfo(message);
        else this.writeError(message);
        
    }

    public writeInfo(message: string) {
        LoggerProvider?.logger?.info(message);
    }

    public writeError(message: string) {
        LoggerProvider?.logger?.error(message);
    }

}