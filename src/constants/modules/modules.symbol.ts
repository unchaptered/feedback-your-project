export interface I_MODULES {
    
    TokenFactory: symbol,
    ConfigFactory: symbol,
    PostgresFactory: symbol,

    DevQueryBuilder: symbol,
    
    JoiProvider: symbol,
    LoggerProvider: symbol,
    ResponseProvider: symbol,

    HomeService: symbol,
    HomeRepository: symbol,

    AuthService: symbol,
    AuthRepository: symbol,

};

export const MODULES: I_MODULES = {

    TokenFactory: Symbol.for('TokenFactory'),
    ConfigFactory: Symbol.for('ConfigFactory'),
    PostgresFactory: Symbol.for('PostgresFactory'),

    DevQueryBuilder: Symbol.for('DevQueryBuilder'),
    
    JoiProvider: Symbol.for('JoiProvider'),
    LoggerProvider: Symbol.for('LoggerProvider'),
    ResponseProvider: Symbol.for('ResponseProvider'),

    HomeService: Symbol.for('HomeService'),
    HomeRepository: Symbol.for('HomeRepository'),

    AuthService: Symbol.for('AuthService'),
    AuthRepository: Symbol.for('AuthRepository'),

};