export interface I_MODULES {
    
    LoggerProvider: symbol,
    LoggerMiddleware: symbol,

    PostgresFactory: symbol,
    ResponseProvider: symbol,
    JoiProvider: symbol,

    AuthService: symbol,
    HomeService: symbol,

    AuthRepository: symbol,
    HomeRepository: symbol,

};

export const MODULES: I_MODULES = {

    LoggerProvider: Symbol.for('LoggerProvider'),
    LoggerMiddleware: Symbol.for('LoggerMiddleware'),

    PostgresFactory: Symbol.for('PostgresFactory'),

    ResponseProvider: Symbol.for('ResponseProvider'),
    JoiProvider: Symbol.for('JoiProvider'),

    AuthService: Symbol.for('AuthService'),
    HomeService: Symbol.for('HomeService'),

    AuthRepository: Symbol.for('AuthRepository'),
    HomeRepository: Symbol.for('HomeRepository'),

};