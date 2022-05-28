import * as winston from 'winston'
import * as winstonDaily from 'winston-daily-rotate-file';
import { provide } from 'inversify-binding-decorators';

// di
import { MODULES } from '../../constants/modules.symbol';

// private
import * as LoggerPrivate from './private/logger.private';

@provide(MODULES.LoggerProvider)
export class LoggerProvider {

    static logger: winston.Logger;

    static async initialize(logDir: string) {
        if (this.logger) return this.logger;

        const formats: winston.Logform.Format[] = [
            LoggerPrivate.getTimeFormat(),
            LoggerPrivate.getStringFormat()
        ];

        const trans: winstonDaily[] = [
            LoggerPrivate.getWinstonDailyByTransport(LoggerPrivate.getPassTrans(logDir)),
            LoggerPrivate.getWinstonDailyByTransport(LoggerPrivate.getErrTrans(logDir))
        ];

        const logger: winston.Logger = await LoggerPrivate.setWinstonInstance(formats, trans);

        this.logger = logger;

        return this.logger;
    }

    public writeInfo(message: string) {
        LoggerProvider.logger.info(message);
    }

    public writeError(message: string) {
        LoggerProvider.logger.error(message);
    }

}