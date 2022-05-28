export interface I_MODULES {
    
    LoggerProvider: symbol,
    LoggerMiddleware: symbol,

    PostgresFactory: symbol,
    ResponseProvider: symbol,
    JoiProvider: symbol,

    HomeService: symbol,

    HomeRepository: symbol,

};

export const MODULES: I_MODULES = {

    LoggerProvider: Symbol.for('LoggerProvider'),
    LoggerMiddleware: Symbol.for('LoggerMiddleware'),

    PostgresFactory: Symbol.for('PostgresFactory'),

    ResponseProvider: Symbol.for('ResponseProvider'),
    JoiProvider: Symbol.for('JoiProvider'),

    HomeService: Symbol.for('HomeService'),

    HomeRepository: Symbol.for('HomeRepository'),

};