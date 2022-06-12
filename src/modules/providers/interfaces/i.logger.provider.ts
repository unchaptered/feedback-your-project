/**
 * Blueprint of DevQueryBuilder
 * 
 * Must Realize `3 public functions`
 */
export interface ILoggerProvider {

    write(isSuccess: boolean, ip: string, message: string): void;
    writeInfo(ip: string, message: string): void;
    writeError(ip: string, message: string): void;

}