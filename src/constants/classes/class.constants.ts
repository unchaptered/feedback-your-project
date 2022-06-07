import { I_CLASSES } from './i.classes.constants';

export const CLASSES: I_CLASSES = {
    LAYERS: {
        CONTROLLERS: {
            HomeController: Symbol.for('HomeController'),
            AuthController: Symbol.for('AuthController'),
            AdminController: Symbol.for('AdminController'),
            FeedbackController: Symbol.for('FeedbackController')
        },
        REPOSITORIES: {
            AuthRepository: Symbol.for('AuthRepository'),
            HomeRepository: Symbol.for('HomeRepository')
        },
        SERVICES: {
            AuthService: Symbol.for('AuthService'),
            HomeService: Symbol.for('HomeService')
        }
    },
    MIDDLEWARES: {
        GUARDS: {
            AccessTokenGuard: Symbol.for('AccessTokenGuard'),
            RefreshTokenGuard: Symbol.for('RefreshTokenGuard')
        }
    },
    MODULES: {
        FACTORIES: {
            ConfigFactory: Symbol.for('ConfigFactory'),
            PostgresFactory: Symbol.for('PostgresFactory'),
            TokenFactory: Symbol.for('TokenFactory')
        },
        BUILDERS: {
            DevQueryBuilder: Symbol.for('DevQueryBuilder'),
            DtoBuilder: Symbol.for('DtoBuilder')
        },
        PROVIDERS: {
            LoggerProvider: Symbol.for('LoggerProvider'),
            ResponseProvider: Symbol.for('ResponseProvider'),
        },
        VALIDATORS: {
            JoiValidator: Symbol.for('JoiValidator')
        }
    }
};