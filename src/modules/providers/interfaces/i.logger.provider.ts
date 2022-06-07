/**
 * Blueprint of DevQueryBuilder
 * 
 * Must Realize `3 public functions`
 */
export interface ILoggerProvider {

    write(isSuccess: boolean, message: string): void;
    writeInfo(message: string): void;
    writeError(message: string): void;

}